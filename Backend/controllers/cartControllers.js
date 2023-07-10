const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// get cart

const getcart = async (req,res) =>{
    try {
        const users = await prisma.cart.findMany({
            include: {
                product: true,
                users: true,

              }
        });
        res.json({
            status : 'success',
            users
        });
    } catch (error) {
        res.json({
            status:'Error',
            error,
        })
    }
}



// create
const createcart = async (req, res) => {
   
    try {
      const {qty, subId} = req.body;

      const existingPro = await prisma.cart.findFirst({
        where: {
          qty,
        },
        include: {
          product: true,
        },
      });

      if (existingPro) {
        const updatedPro = await prisma.cart.update({
          where: {
            cartId: existingPro.cartId,
          },
          data: {
            qty:
              existingPro.qty === existingPro.qty
                ? existingPro.qty
                : existingPro.qty + 1,
          },
          include: {
            product: true,
          },
        });
        
      } else

      console.log(req.user)
      const newcart = await prisma.cart.create({
        data:{
            qty,
            userId:req.user.userId,
            ProductId : subId
        }
    })
      res.json({
        success: true,
        newcart,
      });
    } catch (error) {
      console.log(error)
      res.json({
        success: false,
        error,
      });
    }
  };


//   //   update 

const updateCart = async (req, res) => {
    const { qty } = req.body;
  
    try {
        const{cartId} = req.params;
      const cart = await prisma.cart.update({
        where: {
            cartId: parseInt(cartId),
        },
        data: {
          qty,
      
         
        },
      });
  
      res.json({
        success: true,
        cart,
      });
    } catch (error) {
      console.log(error)
      res.json({
        success: false,
        error,
      });
    }
  };


     //  delete
const deletecart = async(req,res) =>{
    const{cartId} = req.params;

    const cart = await prisma.cart.delete({
        where:{
            cartId: parseInt(cartId),
        }
     });

     res.json({
        status: 'success',
        message: 'catagory deleted successfully!',
        cart,
      })

    }

    // GET ONE cart

const getOne = async (req,res) =>{
  try {
      const {cartId} = req.params;

      const cart = await prisma.cart.findFirst({
          where:{
            cartId: +cartId
              
          },
          include: {
            users : true,
            product:true
          }
          });
          if (!cart){
              res.json({
                  status: 'Error',
                  message: 'The product you are looking for is not in the database',
                });
          }else{
              res.json({
                  status: 'success',
                  cart,
                });
          }
  } catch (error) {
    console.log(error)
      res.json({
          error,
        });
  }
}





module.exports ={
    getcart,
    createcart,
    updateCart,
        getOne,
    deletecart
}

