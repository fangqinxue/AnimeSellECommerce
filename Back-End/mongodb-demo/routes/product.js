const express = require('express');
const getAnimeProduct = require("../controllers/getProduct");
const addAnimeProduct = require("../controllers/addProduct");




const router = express.Router();


router.get("/getHighRateProduct", getAnimeProduct.getProduct)
router.get("/getAnime", getAnimeProduct.getProductAnime)
router.get("/getTags", getAnimeProduct.getProductTags)
router.get("/getAllProduct", getAnimeProduct.getAllProduct)
router.post('/getProductById', getAnimeProduct.getProductById);

router.get('/getSellerProduct',addAnimeProduct.getAllProductBySellerId)

module.exports = router;