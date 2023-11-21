const jwt=require('jsonwebtoken');
require('dotenv').config()

const isLoggedIn=(req,res,next)=>{
try {

 const token=req.cookies.accessToken;
 
 if(!token){
    return res.status(400).json({success:false,message:"Token not found."})
 }

 const decoded=jwt.verify(token,process.env.JWT_KEY)

 if(!decoded){
    return res.status(400).json({success:false,message:"User not found."})
 }
 
 req.userId=decoded.id
 next()

} catch (error) {
    return res.status(500).json({success:false,message:error.message})
}
}

module.exports={isLoggedIn}