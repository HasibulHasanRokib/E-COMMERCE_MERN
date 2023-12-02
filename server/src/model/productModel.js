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
        message:(props)=>{`${props.value} is not a valid price must be grater than 0`}
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
        message:(props)=>{`${props.value} is not a valid quantity must be grater than 0`}
    },
    sold:{
        type:Number,
        default:0
    },
    imageUrls:{
        type:Array,
        required:true
    },

    category:{
        type:Schema.Types.ObjectId,
        ref:'Category',
        required:[true,'Product category is required.']
    }

},{timestamps:true})


const ProductModel = new model('Products',productSchema) 

module.exports=ProductModel;