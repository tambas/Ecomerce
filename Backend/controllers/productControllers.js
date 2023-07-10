const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


// get all product

const getAll = async (req,res) =>{
    try {
        const product = await prisma.product.findMany({
            include: {
                users : true,
                subCatagory:true
              }
        });
        res.json({
            status : 'success',
            product
        });
    } catch (error) {
        console.log(error)
        res.json({
            status:'Error',
            error,
        })
    }
}


// create custumers
const create = async (req,res) =>{
    try {
        const {title,Price,Store, subId,img} = req.body;
        console.log(req.body)
        const checkname = await prisma.product.findFirst({
            where :  {
                title
            }
        })

        if(checkname) {
            res.json({
                status : "Error",
                msg : "title is already in use"
            })
            return
        }
       
        if(req.user.Role !== "ADMIN") {
            res.json({
                status : "Error",
                message : "You are not allowed to do this task"
              })
              return;
           }


        //    console.log(parseInt(subId), )

        const newProducts = await prisma.product.create({
            data:{
                title,
                Price,
                Store ,
                userId:req.user.userId,
                subatCagoryId : +subId ,
                img

            }
        })
        

        res.json({
            newProducts
        })
    } catch (error) {
        console.log(error)
        res.json({
            message: 'The subatCagory isnot found',
           
        })
    }
}

// GET ONE products

const getOne = async (req,res) =>{
    try {
        const {ProductId} = req.params;

        const product = await prisma.product.findFirst({
            where:{
                ProductId: +ProductId
                
            }
            });
            if (!product){
                res.json({
                    status: 'Error',
                    message: 'The product you are looking for is not in the database',
                  });
            }else{
                res.json({
                    status: 'success',
                    product,
                  });
            }
    } catch (error) {
        console.log(error)
        res.json({
            message: 'The product you are looking for is not in the database',
          });
    }
 }

// update product

const update = async (req, res) => {
    const {title,Price,Store} = req.body;
  
    try {
  

        if(req.user.Role !== "ADMIN") {
            res.json({
                status : "Error",
                message : "You are not allowed to do this task"
              })
              return;
           } 

   const{ProductId} = req.params;
   const product = await prisma.product.update({
     where: {
         ProductId: parseInt(ProductId),
     },
     data: {
         title,Price,Store,
         userId:req.user.userId,
     },
   });

   res.json({
     success: true,
     product,
   });

    } catch (error) {
        console.log(error)
      res.json({
        success: false,
        message: 'The product you are looking for is not in the database',
      });
    }
  };


//  delete
const deleteproducts = async(req,res) =>{
    const {ProductId} = req.params;

try {
    if(req.user.Role !== "ADMIN") {
        res.json({
            status : "Error",
            message : "You are not allowed to do this task"
          })
          return;
       } 

    const product = await prisma.product.delete({
        where:{
            ProductId: +(ProductId),
        }
     });

     res.json({
        status: 'success',
        message: 'product deleted successfully!',
        product,
      })
} catch (error) {
    console.log(error)
    res.json({
        success: false,
        message:"data does not exist",
      });
}

    }

module.exports ={
    getAll,
    create,
    update,
    getOne,
    deleteproducts
}




