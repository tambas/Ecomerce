const express = require('express');
const router = express.Router();
const product = require ('../controllers/productControllers');
const protect = require('../middlewares/auth');

// get all

router.get('/all',product.getAll)

// create 
router.post('/n',protect,product.create)

// delete
router.delete('/delete/:ProductId',protect, product.deleteproducts)

// update
router.patch('/update/:ProductId',protect,product.update)

// get one 
router.get('/getone/:ProductId',product.getOne)

module.exports = router;