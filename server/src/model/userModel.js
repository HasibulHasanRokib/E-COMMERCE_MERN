const mongoose=require('mongoose')

const userSchema=mongoose.Schema({
   
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:String,
    },
    address:{
        type:String,
    },
    city:{
        type:String,
    },
    state:{
        type:String,
    },
    postalCode:{ 
        type:String,
    },
    avatar:{
        type:String,
        default:'https://e7.pngegg.com/pngimages/309/175/png-clipart-home-page-web-development-gas-custumer-angle-face.png'
    },
    gender:{
        type:String,
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    isBanned:{
        type:Boolean,
        default:false
    }

},{timestamps: true })

const UserModel=mongoose.model('USERS',userSchema)

module.exports=UserModel