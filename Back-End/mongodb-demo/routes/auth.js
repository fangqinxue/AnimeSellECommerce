const express = require('express');
const authController = require('../controllers/auth');
const addAnimeProduct = require("../controllers/addProduct");




const router = express.Router();

router.post('/register', authController.signup);
router.post('/login', authController.login);

router.post('/addProduct', addAnimeProduct.addProduct)
router.put('/changeUsername', authController.changeUsername);
router.put('/changePassword', authController.changePassword);



module.exports = router;