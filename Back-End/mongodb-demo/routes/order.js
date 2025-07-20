const express = require('express');
const Order = require('../controllers/order')


const router = express.Router();


router.post('/createOrder', Order.createOrder);

router.get('/myOrders', Order.getMyOrders);

module.exports = router;