const express = require('express');
const router = express.Router();
const payment = require ('../controllers/paymentControllers');
const protect = require('../middlewares/auth');

// get all

router.get('/all', payment.getAll)

// create 
router.post('/',protect,payment.create)

// // delete
// router.delete('/delete/:paymentId',payment.deletepayment)

// // update
router.patch('/update/:id',protect,payment.update)

// get one 
// router.get('/getone/:subatCagoryId', subCatagory.getOne)

module.exports = router;