const {Schema} = require("mongoose");

const OrdersSchema = new Schema( {
    name: { type: String, required: true },
    qty: { type: Number, required: true },
    price: { type: Number, required: true },
    mode: { type: String, required: true, enum: ['BUY', 'SELL'] },
  }, { 
    timestamps: true,
    collection: 'orders' // Explicitly set collection name
  })

module.exports = {OrdersSchema}