const express = require('express');
const router = express.Router();
const subCatagory = require ('../controllers/Subcatagory')
const protect = require('../middlewares/auth');

// get all

router.get('/all',subCatagory.getAll)

// create 
router.post('/',protect,subCatagory.createSubCategory)

// delete
router.delete('/delete/:subatCagoryId',protect,subCatagory.deleteSubcat)

// delete
router.patch('/update/:subatCagoryId',protect,subCatagory.updateSubCategory)

// get one 
// router.get('/getone/:subatCagoryId', subCatagory.getOne)

module.exports = router;