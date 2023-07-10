const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient

// get all catagory

const getAll = async (req,res) =>{
  try {
      const catagory= await prisma.catagory.findMany();
      res.json({
          status : 'success',
          catagory

      });
  } catch (error) {
      res.json({
          status:'Error',
          error,
      })
  }
}


// create
const createCategory = async (req, res) => {
    const { type } = req.body;
    try {
   
      const checktypes = await prisma.catagory.findFirst({
        where :  {
          type,
        }
    })
    console.log(checktypes)
    if(checktypes?.CagoryId) {
      
        res.json({
            status : "Error",
            msg : "type is already in use"
        })
        return
    }

      

      if(req.user.Role === "ADMIN " ) {
        res.json({
            status : "Error",
            message : "You are not allowed to do this task"
          })
          return;
       }

      const category = await prisma.catagory.create({
        data: {
            type,
            userId:req.user.userId,
            
            
        },

        
      });
      res.json({
        success: true,
        category,
      });
    } catch (error) {
      console.log(error)
      res.json({
        success: false,
        error,
      });
    }
  };

  //   update 

const updateCategory = async (req, res) => {
    const { type,  } = req.body;
  
    try {
      if(req.user.Role !== "ADMIN") {
        res.json({
            status : "Error",
            message : "You are not allowed to do this task"
          })
          return;
       }

        const{CagoryId} = req.params;
      const category = await prisma.catagory.update({
        where: {
            CagoryId: parseInt(CagoryId),
        },
        data: {
          type,
       userId:req.user.userId,
         
        },
      });
  
      res.json({
        success: true,
        category,
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
const deletecat = async(req,res) =>{
    const {CagoryId} = req.params;

    const catagory = await prisma.catagory.delete({
        where:{
            CagoryId: parseInt(CagoryId),
        }
     });

     res.json({
        status: 'success',
        message: 'catagory deleted successfully!',
        catagory,
      })

    }

    module.exports ={
        getAll,
        createCategory,
        updateCategory,
        // getOne,
        deletecat
    }


    