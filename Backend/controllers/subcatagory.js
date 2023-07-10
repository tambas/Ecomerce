const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient

// get all catagory

const getAll = async (req,res) =>{
    try {
        const catagory= await prisma.subCatagory.findMany({
          include:{
            catogory:true
          }
        });
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
const createSubCategory = async (req, res) => {
  const { type, img,subId } = req.body;
  try {
    if(req.user.Role !== "ADMIN") {
      res.json({
          status : "Error",
          message : "You are not allowed to do this task"
        })
        return;
     }
        

    const subCategory = await prisma.subCatagory.create({
      data: {
          type,
          img,
          CagoryId: +subId,
          userId:req.user.userId,
          
          
      } 
    });
    res.json({
      success: true,
      subCategory,
    });
  } catch (error) {
    console.log(error)
    res.json({
      success: false,
      message:"The Cagory isnot found",
    });
  }
};


//   update 

const updateSubCategory = async (req, res) => {
    const { type, img, } = req.body;
  
    try {
      if(req.user.Role !== "ADMIN") {
        res.json({
            status : "Error",
            message : "You are not allowed to do this task"
          })
          return;
       }
       
        const{subatCagoryId} = req.params;
      const category = await prisma.subCatagory.update({
        where: {
            subatCagoryId: Number(subatCagoryId),
        },
        data: {
          type,
          img,
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
const deleteSubcat = async(req,res) =>{
    const {subatCagoryId} = req.params;
try {
  
  
    if(req.user.Role !== "ADMIN") {
      res.json({
          status : "Error",
          message : "You are not allowed to do this task"
        })
        return;
     }


  const catagory = await prisma.subCatagory.delete({
    where:{
        subatCagoryId: parseInt(subatCagoryId),
    },
 });

 res.json({
    status: 'success',
    message: 'catagory deleted successfully!',
    catagory,
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
        createSubCategory,
        updateSubCategory,
        // getOne,
        deleteSubcat
    }