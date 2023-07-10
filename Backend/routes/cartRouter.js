const express = require('express');
const router = express.Router();
const Cart = require ('../controllers/cartControllers');
const protect = require('../middlewares/auth');

// get all

router.get('/all',Cart.getcart)

// create 
router.post('/', protect, Cart.createcart)

// delete
router.delete('/delete/:cartId',Cart.deletecart)

// update
router.patch('/update/:cartId',Cart.updateCart)

// get one 
router.get('/getone/:cartId', Cart.getOne)

module.exports = router;