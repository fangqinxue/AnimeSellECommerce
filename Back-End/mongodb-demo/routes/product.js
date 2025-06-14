const express = require('express');
const getAnimeProduct = require("../controllers/getProduct");




const router = express.Router();


router.get("/getHighRateProduct", getAnimeProduct.getProduct)

module.exports = router;