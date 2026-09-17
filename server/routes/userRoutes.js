const express=require("express");
const {getUsers,createUser,getUserById,updateUser,deleteUser,loginUser}=require("../controllers/userController");
const router=express.Router();
const protect=require("../middleware/authMiddleware");
const authorize=require("../middleware/roleMiddleware");
const User=require("../models/User");
const message = require("../../message");

router.get("/",getUsers);
router.post("/",createUser);

router.post("/login",loginUser);

router.get("/test",(req,res)=>{
  res.json({message:"User routes are working"});
})

router.get("/profile",protect ,async(req,res,next)=>{
  try{
    const user=await User.findById(req.userId);
    if(!user){
      return res.status(404).json({message:"User not found"});
    }
    res.json({
      _id:user._id,
      name:user.name,
      email:user.email,
      role:user.role
    });
  }
  catch(error){
    next(error);
  }
});

router.get("/manager",protect,authorize("Manager"),(req,res)=>{
  res.json({
    message:"Welcome Manager",
    userId:req.userId,
    role:req.role
  });
});

router.get("/:id",getUserById);
router.put("/:id",updateUser);
router.delete("/:id",deleteUser);


module.exports=router;