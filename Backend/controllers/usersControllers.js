
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


// Token generator

const generateToken = (user) => {
  console.log(user);

  return jwt.sign({ user }, process.env.JWT_SEC, {
    expiresIn: '60d',
  });
};



// get all users

const getAll = async (req,res) =>{
    try {
        const users = await prisma.users.findMany();
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

// create receipt

const create  = async (req,res) =>{
    try {
        const { FirstName, LastName, Address,Email,Password} =  req.body;


        const checkEmail = await prisma.users.findFirst({
            where :  {
              Email,
            }
        })

        if(checkEmail) {
            res.json({
                status : "Error",
                msg : "Email is already in use"
            })
            return
        }
        const salt = bcrypt.genSaltSync(10);

    const hashedPassword = bcrypt.hashSync(Password, salt);
        
       

    const newUser = await prisma.users.create({
        data:{
            FirstName, LastName, Address,Email,Password :hashedPassword,
        }
    })
    res.json({
        newUser
    })
    } catch (error) {
        console.log(error)
        res.json(error)
    }
}

// GET ONE user
const getOne = async (req,res) =>{
    try {
        const {userId} = req.params;

        const users = await prisma.users.findFirst({
            where:{
                userId: +userId
                
            }
            });
            if (!users){
                res.json({
                    status: 'Error',
                    message: 'The users you are looking for is not in the database',
                  });
            }else{
                res.json({
                    status: 'success',
                    users,
                  });
            }
    } catch (error) {
        res.json({
            error,
          });
    }
 }

//  update user

 const update = async (req, res) => {
    const { FirstName, LastName, Address,Email,Password} =  req.body;
  
    try {
        const{userId} = req.params;
      const user = await prisma.users.update({
        where: {
            userId: parseInt(userId),
        },
        data: {
            FirstName, LastName, Address,Email,Password,
        },
      });
  
      res.json({
        success: true,
        user,
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

const deleteuser = async(req,res) =>{
    const {userId} = req.params;
    console.log(userId)

    const users = await prisma.users.delete({
        where:{
            userId: parseInt(userId),
        }
     });

     res.json({
        status: 'success',
        message: 'users deleted successfully!',
        users,
      })

    }

    // UPDATE THE ROLE

const updateRole = async (req, res) => {
    try {
      const { Role, userId } = req.body;

      if(req.user.Role === "ADMIN" && "SUPERADMIN") {
        res.json({
            status : "Error",
            message : "You are not allowed to do this task"
          })
          return;
       } 
  
      if (!Role) {
        res.json({
          
          status: 'Error',
          message: 'Please add the role',
        });
        return;
      }
  
      const updatedUser = await prisma.users.update({
        where: {
          userId: parseInt(userId)
        },
        data: {
          Role: Role.toUpperCase(),
        },
      });
  
      res.json(updatedUser);
    } catch (error) {
      console.log(error)
      res.json(error);
    }
  };


// registerUser

  const registerUser = async (req, res, next) => {
   try {
    const { FirstName, LastName, Email,Password} =  req.body;
    if (!Email || !Password || !FirstName || !LastName) {
      res.json({
        status: 'Error',
        message: 'Email or password was not provided',
      });
      return;
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(Password, salt);
    const newUser = await prisma.users.create({
      data: {
         Email,
         Password: hashedPassword,
        FirstName,
        LastName,
        Role: Email === "muhaabdi71@gmail.com" ? "SUPERADMIN" :"USER"
      
      },
    });
    const token = generateToken(newUser.userId);
    res.json({
      user:{...newUser}  ,
      token,
      status: 'Success',
    });
   } catch (error) {
    console.log(error)
    res.status(403).json({
      status: 'ERROR',
      message: error,
    });
   }
  };



//  LOGIN NEW USER - PRV

const login = async (req, res) => {
  const { Email, Password } = req.body;
   try {
    if (!Email || !Password ) {
      res.json({
        status: 'Error',
        message: 'Email or password was not provided',
      });
      return;
    }
    const userExisting = await prisma.users.findFirst({
      where: {
       Email,
      },
    });
  
    if (!userExisting) {
      res.json({
        status: 'Error',
        message: 'Wrong credentials',
      });
      return;
    }
    const dehashedPass = bcrypt.compareSync(Password, userExisting.Password);
    if (dehashedPass) {
      const token = generateToken(userExisting.userId);
      res.json({
        status: 'Success',
        user : userExisting,
        message: 'You are logged in',
        token
      });
    } 
   } catch (error) {
    res.json({
      status: 'Error',
      message: 'Wrong credentials',
    });
   }
}


    module.exports ={
        getAll,
        create,
        update,
        getOne,
        deleteuser,
        updateRole,
        registerUser,
        login
    }