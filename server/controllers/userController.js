const User= require("../models/User");

async function getUsers(req,res,next) {
  try{
    const users=await User.find();
    res.json(users);
  }
  catch(error){
    next(error);
  }
}

async function createUser(req,res,next){
  try{
     const user= await User.create(req.body);
     res.status(201).json(user);
  }
  catch(error){
    next(error)
  }
}

async function getUserById(req,res,next) {
  try{
    const user= await User.findById(req.params.id);
    if(!user){
      return res.status(404).json({
        message: "User not found"
      });
    }
    res.json(user);
  } catch(error){
    next(error);
  }
}

async function updateUser(req,res,next){
  try{
    const user=await user.findByIdAndUpdate(
      req.params.id,
      req.body,
      {new:true ,runValidators: true}
    );

    if(!user){
      return res.status(404).json({message:"User not found"}); 
    }
    res.json(user);
  }
  catch(error){
    next(error);
  }
}

module.exports={getUsers,createUser,getUserById,updateUser};