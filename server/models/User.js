const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
  name:{
    type:String,
    require:true 
  },
email: {
    type: String,
    required: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
},
  role:{
    type: String,
    require:true,
    enum:["Developer","Tester","Manager"]
  }
});

userSchema.pre("save",function(){
  console.log("About to save:", this.name);
  this.name=this.name.toLowerCase();
});

const User=mongoose.model("User",userSchema);

module.exports=User;