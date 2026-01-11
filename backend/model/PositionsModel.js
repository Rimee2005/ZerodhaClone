const mongoose = require("mongoose");

const { PositionsSchema } = require("../schemas/PositionsSchema");

// Use the same pattern as user.js - check if model exists, otherwise create it
const PositionsModel = mongoose.models.position || mongoose.model("position", PositionsSchema);

module.exports = { PositionsModel };