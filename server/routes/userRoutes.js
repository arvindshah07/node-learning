const express=require("express");
const {getUsers,createUser,getUserById,updateUser,deleteUser}=require("../controllers/userController");
const router=express.Router();

router.get("/",getUsers);
router.post("/",createUser);
router.get("/:id",getUserById);
router.get("/:id",updateUser);
router.delete("/:id",deleteUser);

module.exports=router;