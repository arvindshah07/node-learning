const express=require("express");
const {getUser}=require("../controllers/userController");
const router=express.Router();

router.get("/",(req,res)=>{
  res.json({
    message:"All Users"
  });
});

module.exports=router;