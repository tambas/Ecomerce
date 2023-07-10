const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const jwt = require('jsonwebtoken');
const { checkout } = require('../routes/productRouter');

const protect =  async (req, res, next) => {
  const token = req.headers?.authorization?.split(' ')[1];

  if (!token) {
    res.json({
      status: 'Error',
      message: 'You are not authenticated',
    });
    return;
  }

  const decoded = jwt.verify(token, process.env.JWT_SEC, (err, data) => {
    if (err) {
      res.json({
        status: 'Error',
        message: 'You are not authenticated',
      });
      return
    }
    return data;

    // BUILT IN USERID
    // return data;

    
  });
  
  const checkUser =  await prisma.users.findFirst({
    where: {
      userId:  decoded.user
      
     },
  })
  if(checkUser){
   
    req.user = checkUser
    next();
  } else {
    res.json({
      status : "Error",
      message : "You are not allowed to do this task"
    })
  }
 

 
};



module.exports =  protect;