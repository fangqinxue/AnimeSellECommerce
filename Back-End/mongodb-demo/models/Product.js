const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  anime: { type: String, required: true },
  character: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  rating: { type: Number, default: 0 },
  tags: [String],
  release_date: { type: Date },
  images: [String],
  description: String,
  dimensions: {
    height_cm: Number,
    width_cm: Number,
    depth_cm: Number
  },
  manufacturer: String,
  available: { type: Boolean, default: true }
});

module.exports = mongoose.model('Product', ProductSchema);
