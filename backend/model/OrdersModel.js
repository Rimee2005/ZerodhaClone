const mongoose = require("mongoose");
const { OrdersSchema } = require("../schemas/OrdersSchema");

// PRODUCTION-READY: Use exact same pattern as user.js
// This pattern prevents "model already registered" errors and ensures it's always a constructor
// mongoose.models.Order checks if model exists, otherwise creates it
const OrdersModel = mongoose.models.Order || mongoose.model("Order", OrdersSchema);

module.exports = { OrdersModel };
