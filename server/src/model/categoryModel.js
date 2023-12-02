const mongoose = require ('mongoose')

const categorySchema= new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        unique:true,
        required:[true,'Category name is required.']
    },
    slug:{
     type:String,
     lowercase:true,
     required:[true,'Category slug is required.']
    },
    categoryImage:{
        type:String,
        required:true
    }
},{timestamps:true})

const CategoryModel=mongoose.model("Category",categorySchema)

module.exports=CategoryModel;