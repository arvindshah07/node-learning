const jwt=require("jsonwebtoken");
const message = require("../../message");

function protect(req,res,next){
  try{
    const authHeader=req.headers.authorization ;
    if(!authHeader){
      return res.status(401).json({
        message:"No token provided"
      });
    }
    const token=authHeader.split(" ")[1];

    if(!token){
      return res.status(401).json({
        message:"Invalid authorization format"
      });
    }

    const decoded=jwt.verify(token,process.env.JWT_SECRET);
    req.userId=decoded.userId;
    req.role=decoded.role ;
    next();
  }
  catch(error){
    console.log("JWT ERROR",error.message);
    
    return res.status(401).json({
      message : "Invalid or expired token"
    });
  }
}

module.exports=protect ;