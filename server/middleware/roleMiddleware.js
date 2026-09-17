const message = require("../../message")

function authorize(role){
  return (req,res,next)=>{
    if(req.role!==role){
      return res.status(403).json({
        message:"Access denied"
      });
    }
    next();
  };
}
module.exports=authorize;