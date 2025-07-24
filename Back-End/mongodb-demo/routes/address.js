const express = require('express');

const addressUse = require('../controllers/address')




const router = express.Router();

router.post('/addAddress', addressUse.addAddress);
router.get('/getUserAddresses', addressUse.getUserAddresses);
router.post('/updateAddress/:addressId', addressUse.updateAddress);
router.delete('/deleteAddress/:addressId', addressUse.deleteAddress);
router.put('/setDefault/:addressId', addressUse.setDefaultAddress);



module.exports = router;