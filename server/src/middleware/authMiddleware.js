const jwt=require('jsonwebtoken');
require('dotenv').config()
const UserModel=require('../model/userModel')

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

const isAdmin=async(req,res,next)=>{
   try {
     const adminExist= await UserModel.findOne({_id:req.userId})
     if(adminExist.isAdmin===false){
      return res.status(403).json({success:false,message:"Only admin can access this."})
     }
     next()
   } catch (error) {
      console.log(error.message)
   }
}

module.exports={isLoggedIn,isAdmin}