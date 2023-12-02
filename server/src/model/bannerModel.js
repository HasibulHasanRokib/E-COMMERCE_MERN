const mongoose = require ('mongoose')

const bannerSchema= new mongoose.Schema({
    bannerImages:{
        type:String,
        required:true
    }
},{timestamps:true})

const BannerModel=mongoose.model("Banner",bannerSchema)

module.exports=BannerModel;