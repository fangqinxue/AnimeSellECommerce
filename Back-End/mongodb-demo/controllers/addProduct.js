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