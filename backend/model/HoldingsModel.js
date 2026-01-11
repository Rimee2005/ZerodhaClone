const mongoose = require("mongoose");

const { HoldingsSchema } = require("../schemas/HoldingsSchema");

// Use the same pattern as user.js - check if model exists, otherwise create it
const HoldingsModel = mongoose.models.holding || mongoose.model("holding", HoldingsSchema);

module.exports = { HoldingsModel };