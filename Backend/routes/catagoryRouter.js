const express = require('express');
const router = express.Router();
const Catagory = require ('../controllers/catagoryControllers');
const protect = require('../middlewares/auth');

// get all

router.get('/all',Catagory.getAll)

// create 
router.post('/',protect,Catagory.createCategory)

// delete
router.delete('/delete/:CagoryId',protect,Catagory.deletecat)

// delete
router.patch('/update/:CagoryId',protect,Catagory.updateCategory)

// get one 
// router.get('/getone/:subatCagoryId', subCatagory.getOne)

module.exports = router;