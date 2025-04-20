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

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
 