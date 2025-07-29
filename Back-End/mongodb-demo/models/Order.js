const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  shippingAddress: {
    recipientName: String,
    phoneNumber: String,
    province: String,
    city: String,
    district: String,
    detail: String,
    postalCode: String,
    lat: Number,
    lng: Number
  },
  items: [
    {
      id: String,
      name: String,
      character: String,
      anime: String,
      price: Number,
      quantity: Number,
      image: String,
      seller: {               // 添加商家引用
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seller',
        required: true
      }
    }
  ],
  total: Number,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);