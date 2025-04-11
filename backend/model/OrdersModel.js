const {model} = require("mongoose");
const mongoose = require("mongoose");

const OrderSchema =  new mongoose.Schema({
    name: String,
    qty: Number,
    price: Number,
    mode: String,
  }, { timestamps: true });

  const OrdersModel = mongoose.model("Orders", OrderSchema);

module.exports = {OrdersModel , OrderSchema} ;