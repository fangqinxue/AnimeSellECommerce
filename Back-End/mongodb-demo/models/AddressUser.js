const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    index: true // 可加 unique 但不建议，如果每用户多个地址
  },
  recipientName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  province: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  detail: {
    type: String,
    required: true,
  },
  postalCode: {
    type: String,
  },
  isDefault: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lat: {
    type: Number
  },
  lng: {
    type: Number
  }
});

module.exports = mongoose.model('Address', addressSchema);