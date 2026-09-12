const message = require("../../message");
const User= require("../models/User");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

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

async function deleteUser(req,res,next) {
  try{
     const user=await User.findByIdAndDelete(req.params.id);
     if(!user){
      return res.status(404).json({
        message: "User not found"
      });
     }
     res.json({
      message : "User deleted successfully",
      user
     })
  }
  catch(error){
    
  }
}

async function loginUser(req, res, next) {    
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });


        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }


        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const token=jwt.sign(
          {userId:user._id,
            role:user.role
          },
          process.env.JWT_SECRET,
          {expiresIn:"1h"}
        )

        res.json({
            message: "Login successful",token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        next(error);
    }
}

module.exports={getUsers,createUser,getUserById,updateUser,deleteUser,loginUser};
