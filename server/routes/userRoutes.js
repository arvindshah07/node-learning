const express=require("express");
const {getUsers,createUser,getUserById,updateUser,deleteUser,loginUser}=require("../controllers/userController");
const router=express.Router();

router.get("/",getUsers);
router.post("/",createUser);

router.post("/login",loginUser);

router.get("/:id",getUserById);
router.put("/:id",updateUser);
router.delete("/:id",deleteUser);


module.exports=router;