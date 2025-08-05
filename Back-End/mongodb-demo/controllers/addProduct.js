const express = require('express');
const Figure = require('../models/Product');

exports.addProduct = async (req, res) => {
    try {
        const figure = new Figure(req.body);
        await figure.save();
        res.status(201).json({ message: 'Figure created', figure });
      } catch (error) {
        res.status(400).json({ error: error.message });
      }

  };

  exports.getAllProductBySellerId = async(req, res) => {
    try {
      const { sellerId } = req.query;
      const query = sellerId ? { seller: sellerId } : {};
      const products = await Figure.find(query).sort({ createdAt: -1 });
      res.json(products);
    } catch (err) {
      res.status(500).json({ message: '获取商品失败', error: err });
    }
  }