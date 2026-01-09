const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
username  :{
  type: String,
  required : true,
  min:6,
  max: 255
},
email :{
  type: String,
  required : true,
  min:6,
  max: 255,
  unique:true
},
password :{
  type: String,
  required : true,
  min:6,
  max: 1000
},
date :{
  type: Date,
  default: Date.now
},
});

// Prevent re-hashing if password is already hashed (starts with $2a$, $2b$, or $2y$)
userSchema.pre("save", async function (next) {
  // Skip if password wasn't modified
  if (!this.isModified("password")) {
    return next();
  }
  // If password is already a bcrypt hash (starts with $2), don't re-hash it
  if (this.password && this.password.startsWith('$2')) {
    return next();
  }
  // If we get here, the password is plain text (shouldn't happen in our flow)
  // But we'll let it through without hashing since we hash in the route
  next();
});

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
 