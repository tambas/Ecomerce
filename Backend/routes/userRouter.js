const express = require('express');
const router = express.Router();
const user = require ('../controllers/usersControllers')
const protect = require('../middlewares/auth');
// get all

router.get('/all',user.getAll)

 // create 
router.post('/',user.create)

// get one 
router.get('/getone/:userId', user.getOne)

// delete
router.delete('/delete/:userId',protect, user.deleteuser)


// update
router.put('/update/:userId', user.update)

// update role
router.put('/role',protect, user.updateRole)
// register
router.post('/new', user.registerUser);
// login
router.post('/login', user.login);


module.exports = router;