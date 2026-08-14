const express = require("express");
const connectDB = require("./server/db");
const User = require("./server/models/User");

const app = express();

app.use(express.json());

connectDB();

app.post("/users", async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        if(error.name==="ValidationError"){
            return res.status(400).json({
                message: error.message
            });
        }
        res.status(500).json({
            message: "Server error"
        });
    }
});

app.get("/users", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

app.get("/users/:id",async(req,res)=>{
    try{
        const user=await User.findById(req.params.id);
        if(!user){
            return res.status(404).json({
                message:"User not found"
            });
        }
        res.json(user);
    }
    catch(error){
        res.status(500).json({
            message:error.message
        });
    }
})

app.put("/users/:id", async(req,res)=>{
    try{
        const user=await User.findByIdAndUpdate(req.params.id , req.body, {new :true});
        if(!user){
            return res.status(404).json({
                message:"User not found"
            });
        }
        res.json(user);
    }
    catch(error){
        res.status(500).json({
            message:error.message
        });
    }
});

app.delete("/users/:id",async(req,res)=>{
    try{
        const user=await User.findByIdAndDelete(req.params.id);
        if(!user){
            return res.status(404).json({
                message:"User not found"
            });
        }
        res.json({
            message:"User deleted successfully",
            user
        });
    }
    catch(error){
        res.status(500).json({
          message:error.message  
        });
    }
})

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});