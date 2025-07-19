const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  items: [
    {
      id: String,
      name: String,
      character: String,
      anime: String,
      price: Number,
      quantity: Number,
      image: String
    }
  ],
  total: Number,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);