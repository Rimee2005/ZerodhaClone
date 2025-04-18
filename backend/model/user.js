const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  // Add other fields as needed
});

module.exports.User = mongoose.models.User || mongoose.model("User", userSchema);
