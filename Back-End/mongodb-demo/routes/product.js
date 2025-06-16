const express = require('express');
const getAnimeProduct = require("../controllers/getProduct");




const router = express.Router();


router.get("/getHighRateProduct", getAnimeProduct.getProduct)
router.get("/getAnime", getAnimeProduct.getProductAnime)
router.get("/getTags", getAnimeProduct.getProductTags)
router.get("/getAllProduct", getAnimeProduct.getAllProduct)

module.exports = router;