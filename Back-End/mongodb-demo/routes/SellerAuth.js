const express = require('express');
const sellerAuthRouter = require( "../controllers/sellerAuth")




const router = express.Router();

router.post('/register', sellerAuthRouter.SellerRegister);
router.post('/login', sellerAuthRouter.sellerLogin);




module.exports = router;