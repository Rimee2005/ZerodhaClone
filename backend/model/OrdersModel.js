const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, minlength: 3 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
  },
  { timestamps: true }
);

// Pre-save hook to hash the password (only if not already hashed)
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  // If password is already a bcrypt hash (starts with $2), don't re-hash it
  if (this.password && this.password.startsWith('$2')) {
    return next();
  }
  // Only hash if it's a plain text password
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Create and export model and schema
const UserModel = mongoose.model("User", UserSchema);

module.exports = { UserModel, UserSchema };
