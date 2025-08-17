const express = require('express');
const Order = require('../controllers/order')


const router = express.Router();


router.post('/createOrder', Order.createOrder);

router.get('/myOrders', Order.getMyOrders);

router.post('/requestRefund', Order.requestRefund)
router.get("/seller/:sellerId",Order.getSellerAllOrder)
router.patch('/seller/orders/:orderId/items/:itemId/ship',Order.PendingConfirmSeller)
router.patch('/seller/orders/:orderId/items/:itemId/refund',Order.RefundConfirmSeller)

module.exports = router;