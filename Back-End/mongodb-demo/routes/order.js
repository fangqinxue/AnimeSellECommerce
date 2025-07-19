const express = require('express');
const Order = require('../controllers/order')


const router = express.Router();


router.post('/createOrder', Order.createOrder);


module.exports = router;