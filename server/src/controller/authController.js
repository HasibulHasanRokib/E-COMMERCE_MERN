const UserModel = require("../model/userModel");
const bcrypt=require("bcryptjs");
const salt = bcrypt.genSaltSync(10);
const jwt=require('jsonwebtoken')
require('dotenv').config()

const handleSignUp=async(req,res)=>{
    try {

        const {name,email,password}=req.body;
 
        if(!name || !email || !password ){
           return res.status(401).json({success:false,message:"Fill the required filed."})
        }

        const userExist= await UserModel.findOne({email:email})

        if(userExist){
            return res.status(401).json({success:false,message:"This email already register."})
        }

        const newUser= await UserModel({name,email,password:bcrypt.hashSync(password,salt)})

        await newUser.save()

        const{password:pass,...user}=newUser._doc;

        res.status(201).json({success:true,message:"Registration successful.",user})

        
    } catch (error) {
       return res.status(500).json({success:true,message:"Registration failed."}) 
    }
}

const handleSignIn=async(req,res)=>{
    try {
       const {email,password}=req.body;
       if(!email || !password){
        return res.status(400).json({success:false,message:"Fill the required field."})
       } 

     const userExist=await UserModel.findOne({email:email})
     
     if(!userExist){
        return res.status(400).json({success:false,message:"This user not register."})   
     }
     
     const passOk=bcrypt.compareSync(password,userExist.password)

     if(!passOk){
        return res.status(401).json({success:false,message:"Wrong credentials."})
     }

     if(userExist.isBanned){
        return res.status(401).json({success:false,message:"You are block from this site."})  
     }

     const token=jwt.sign({id:userExist._id},process.env.JWT_KEY)

     const {password:pass,...user}=userExist._doc;

     res.cookie('accessToken',token).json({success:true,message:'Login successful.',user})

    } catch (error) {
        return res.status(500).json({success:false,message:"Login failed."})   
    }
}

const handleGoogleAuth=async(req,res)=>{
try {
const userExist=await UserModel.findOne({email:req.body.email})

if(userExist){
    const token=jwt.sign({id:userExist._id},process.env.JWT_KEY)
    const{password:pass,...user}=userExist._doc;
    return res.cookie('accessToken',token).json({success:true,message:'Login successful',user})
}else{
    const generatePassword=Math.random().toString(36).slice(-8);
    const hashedPassword=bcrypt.hashSync(generatePassword,salt)
    const newUser= new UserModel({
        name:req.body.name.split('').join('').toLowerCase(),
        email:req.body.email,
        password:hashedPassword,
        avatar:req.body.avatar
    })
    await newUser.save()
    const token=jwt.sign({id:newUser._id},process.env.JWT_KEY)
    const{password:pass,...user}=newUser._doc;
    return res.cookie('accessToken',token).json({success:true,message:'Login successful',user})
}

} catch (error) {
  return res.status(500).json({success:false,message:error.message})  
}
}

const handleUserUpdate=async(req,res)=>{
    try {

     const id=req.params.id;

     if(id!==req.userId){
     return res.status(401).json({success:false,message:"You can only update your account."})
     }  
     
     const updateUser=await UserModel.findByIdAndUpdate({_id:id},{
        $set:{
           name:req.body.name, 
           email:req.body.email, 
           phone:req.body.phone, 
           address:req.body.address, 
           city:req.body.city, 
           state:req.body.state, 
           postalCode:req.body.postalCode, 
           gender:req.body.gender,
           avatar:req.body.avatar
        }
     },{new:true})


     if (!updateUser) {
        return res.status(404).json({ success: false, message: 'User not found' });
    }

     const{password:pass,...user}=updateUser._doc;
     res.status(202).json({success:true,message:'Update successful',user})

    } catch (error) {
        return res.status(401).json({success:false,message:error.message})
    }
}

const handleSignOut=async(req,res)=>{
    try {
       res.clearCookie('accessToken').json({success:true,message:"Log out successful."}) 
    } catch (error) {
        console.log(error.message)
    }
}

const handleUpdatePassword=async(req,res)=>{

    try {
        const id=req.params.id;

        if(id!==req.userId){
            return res.status(404).json({success:false,message:"User id not found."})
        }

        const userExist=await UserModel.findOne({_id:id})
      
        const {oldPassword,newPassword,confirmPassword}=req.body;

        if(!oldPassword || !newPassword || !confirmPassword){
            return res.status(400).json({success:false,message:"Fill the required field."})  
        }

        if(newPassword !== confirmPassword){
            return res.status(400).json({success:false,message:"Confirm password not match."})
        }

        const passwordMatch=bcrypt.compareSync(oldPassword,userExist.password)

        if(!passwordMatch){
            return res.status(400).json({success:false,message:"Password not match."})
        }

        const hashedPassword=bcrypt.hashSync(confirmPassword,salt)

        const newUpdateUser=await UserModel.findByIdAndUpdate({_id:id},{
            $set:{
             password:hashedPassword
            }
        },{new:true})

        const {password:pass,...user}=newUpdateUser._doc;

        res.status(202).json({success:true,message:"Password update successful.",user})

               
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({success:false,message:"Password update failed."})
    }
}

const handleForgetPassword=async(req,res)=>{
try {
    
    
} catch (error) {
console.log(error.message)
}
}
const handleRestPassword=async(req,res)=>{
try {
    
} catch (error) {
console.log(error.message)
}
}

module.exports={handleSignUp,handleSignIn,handleGoogleAuth,handleSignOut,handleUserUpdate,handleUpdatePassword,handleForgetPassword,handleRestPassword}