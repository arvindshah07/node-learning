const express=require("express");
const {getUsers,createUser,getUserById,updateUser}=require("../controllers/userController");
const router=express.Router();

router.get("/",getUsers);
router.post("/",createUser);
router.get("/:id",getUserById);
router.get("/:id",updateUser)

module.exports=router;