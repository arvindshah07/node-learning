const express=require("express");
const app=express();
const userRoutes=require("./server/routes/userRoutes");

const express = require("express");

const app = express();

app.use(express.json());

const users = [
    { id: 1, name: "Arvind", role: "Developer" },
    { id: 2, name: "Rahul", role: "Tester" },
    { id: 3, name: "Aman", role: "Manager" }
];

app.get("/users/:id", (req, res) => {
    const id = Number(req.params.id);

    const user = users.find((u) => u.id === id);

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    res.json(user);
});

app.post("/users",(req,res)=>{
  const {id,name,role}= req.body ;
  users.push({id,name,role});
  if(!id || !name || !role){
    return res.status(400).json({
        message:"All fields are required"
    })
  }
  res.status(201).json({
    message:"User added successfully",
    user:{id,name,role}
  });
})

app.delete("/user/:id",(req,res)=>{
    const id=Number(req.params.id);
   const index= users.findIndex((user)=>user.id===id);

   if(index===-1){
    return res.status(404).json({
        message:"User not found"
    });
   }
   users.splice(index,1);

   res.json({message: "User deleted successfully"});
});

app.put("/users/:id",(req,res)=>{
    const id=Number(req.params.id);
    const {name,role}=req.body ;
    const user=users.find((user)=>user.id=id);
    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    user.name = name;
    user.role = role;

    res.json({
        message: "User updated successfully",
        user
    });

})

app.use((req,res,next)=>{
 console.log(`${req.method}  ${req.url}`);
 next();
})

app.use((req,res,next)=>{
    const isAdmin = false;
    if(!isAdmin){
        return res.status(403).json({"message":"Access Denied"});
    }
    next();
})







app.listen(3000, () => {
    console.log("Server is running on port 3000");
});