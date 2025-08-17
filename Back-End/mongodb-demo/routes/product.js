const express = require('express');
const getAnimeProduct = require("../controllers/getProduct");
const addAnimeProduct = require("../controllers/addProduct");
const addImage = require("../controllers/addImage")
const multer = require('multer');
const path = require('path');



const router = express.Router();

// 设置存储位置和文件名
const storage1 = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'static/temp'); // 确保你有 uploads 文件夹
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    },
  });
  
  const upload = multer({ storage: storage1 });


  const storage2 = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'static/'); // 确保你有 uploads 文件夹
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    },
  });
  
  const upload2 = multer({ storage: storage2 });




router.get("/getHighRateProduct", getAnimeProduct.getProduct)
router.get("/getAnime", getAnimeProduct.getProductAnime)
router.get("/getTags", getAnimeProduct.getProductTags)
router.get("/getAllProduct", getAnimeProduct.getAllProduct)
router.post('/getProductById', getAnimeProduct.getProductById);

router.get('/getSellerProduct',addAnimeProduct.getAllProductBySellerId)

router.post('/upload-multiple-temp', upload.array('images', 10),addImage.addImageTemp)

router.post('/upload-multiple', upload2.array('images', 10),addImage.addImage)


router.post("/edit/:id",addAnimeProduct.editProduct );

router.delete('/delete-temp-image',addImage.deleteTempImage);
router.post('/delete-static-images',addImage.deleteImage)

router.delete('/products/:id', addAnimeProduct.deleteProduct)
module.exports = router;