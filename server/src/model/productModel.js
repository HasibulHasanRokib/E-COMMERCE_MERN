const {Schema, model}=require('mongoose')

const productSchema= new Schema({
    title:{
        type:String,
        trim:true,
        required:[true,'Product name is required.']
    },
    slug:{
        type:String,
        unique:true,
        lowercase:true
    },
    description:{
        type:String,
        trim:true,
        required:[true,'Product description is required.']
    },

    regularPrice:{
        type:Number,
        trim:true,
        required:[true,'Product price is required.'],
        validate:(v)=> v > 0,
        message:(props)=>{`${props.value} is not a valid discount percentage, must be greater than or equal to 0`}
    },
    discountPercentage:{
        type:Number,
        default:0
    },
    rating:{
        type:Number,
        default:0   
    },
    brand:{
        type:String,
    },

    stock:{
        type:Number,
        trim:true,
        required:[true,'Product quantity is required.'],
        validate:(v)=> v > 0,
        message:(props)=>{`${props.value}  is not a valid  stock, must be greater than or equal to 0`}
    },
    sold:{
        type:Number,
        default:0
    },
    imageUrls:{
        type:Array,
        required:true
    },
    colors:{
      type:Array,
    },
    clothSize:{
      type:Array,
    },
    shoesSize:{
      type:Array,
    },
    phoneStorage:{
      type:Array,
    },

    category:{
        type:String,
        ref:'category',
        required:[true,'Product category is required.']
    }

},{timestamps:true})


const ProductModel = new model('Products',productSchema) 

module.exports=ProductModel;