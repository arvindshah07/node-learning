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

module.exports={getUsers};