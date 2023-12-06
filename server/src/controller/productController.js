const ProductModel =require('../model/productModel')
const slugify = require('slugify')


const handleCreateProduct =async (req, res) => {
    try {

       const { title,description , regularPrice ,imageUrls, category,discountPercentage,rating ,brand,stock,sold,colors,shoesSize,phoneStorage,clothSize} = req.body;

       if(!title || !description || !regularPrice || !stock || !category || !imageUrls ) {
        return res.status(401).json({success:false,message:'Fill the required field.'})
       }

       const productExist= await ProductModel.findOne({title})

       if(productExist){
        return res.status(409).json({success:false,message:'This product already created.'})
       }
       
       const newProduct= await ProductModel({ title,slug:slugify(title),description , regularPrice , discountPercentage,rating ,brand,stock, sold, imageUrls, category,colors,shoesSize,phoneStorage,clothSize })

       await newProduct.save();

       res.status(201).json({success:true,message:'New Product create successful.',newProduct})



    } catch (error) {
        console.log(error.message)
        return res.status(500).json({success:false,message:error.message})
    }
}

const handleGetProducts=async(req,res)=>{
    try {
        const search = req.query.search || '';
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 100;

        const searchRegExp = new RegExp('.*' + search + '.*', 'i')
      

        const filter = {  
            $or:[
                { title: { $regex: searchRegExp }, }
            ]                   
        }

        const products = await ProductModel.find(filter).limit(limit).skip((page - 1) * limit)

        const count = await ProductModel.find(filter).countDocuments()

        if (products.length===0) {
            return res.status(404).json({ success: false, message: "No products found." })
        }

        res.status(201).json({
            success: true,
            message: 'Products were return.',
            products,
            pagination: {
                totalPages: Math.ceil(count / limit),
                count,
                currentPage: page,
                previousPage: page - 1 > 0 ? page - 1 : null,
                nextPage: page + 1 <= Math.ceil(count / limit) ? page + 1 : null
            }
        })

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({success:false,message:"Internal Server Error",error:error.message})
    }
}
 
const handleGetProduct=async(req,res)=>{
    try {
        const {slug} = req.params;
        const product= await ProductModel.findOne({slug:slug})

        if(!product){
            return res.status(404).json({success:false,message:"Product not found."})
        }

        res.status(201).json({success:true,message:"Product return.",product})

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({success:false,message:error.message})
    }
}
const handleGetProductById=async(req,res)=>{
    try {
        const { id } = req.params;

        const productInfo=await ProductModel.findOne({_id:id})

        if(!productInfo){
            return res.status(404).json({success:false,message:"Product not found."})
        }

        res.status(200).json({success:true,message:"Product return.",productInfo})

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({success:false,message:error.message})
    }
}

const handleUpdateProduct=async(req,res)=>{
    try {
        const {id}=req.params;

        const updateProduct= await ProductModel.findByIdAndUpdate({_id:id},{
            $set:{
                title:req.body.title,
                description:req.body.description,
                regularPrice:req.body.regularPrice,
                discountPercentage:req.body.discountPercentage,
                imageUrls:req.body.imageUrls,
                stock:req.body.stock,
                category:req.body.category,
                brand:req.body.brand,
                rating:req.body.rating,
                sold:req.body.sold,
                colors:req.body.colors,
                phoneStorage:req.body.phoneStorage,
                shoesSize:req.body.shoesSize,
                clothSize:req.body.clothSize,
                
                
            }
        },{new:true})

      res.status(202).json({success:true,message:"Product update successful.",updateProduct})

    } catch (error) {
        return res.status(500).json({success:false,message:error.message})       
    }
}

const handleDeleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(404).json({ success: false, message: "Product id not found." })
        }

        const deleteProduct=await ProductModel.findByIdAndDelete({_id:id})

        if(!deleteProduct){
            return res.status(404).json({ success: false, message: "Product not found." })
        }

        res.status(202).json({success:true,message:"Product delete successful",deleteProduct})

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ success: false, message:error.message })
    }
}

const handleNewArrivals=async(req,res)=>{
    try {
        const newArrivals = await ProductModel.find({}).sort({ createdAt: -1 }).limit(7);

        res.status(200).json({
            success: true,
            message: 'New arrivals fetched successfully.',
            newArrivals,
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: error.message });
    }
}

const handleGetProductsByCategory=async(req,res)=>{
    try {
        const {category}=req.params;
        if(!category){
            return res.status(404).json({success:false,message:"Category not found."})
        }
        const products=await ProductModel.find({category})
        if(!products){
            return res.status(404).json({success:false,message:"Products not found."})    
        }
        res.status(200).json({success:true,message:"Products return",products})
    } catch (error) {
        return res.status(500).json({success:false,message:error.message})
    }
}

module.exports = { handleCreateProduct,handleGetProducts,handleGetProduct,handleUpdateProduct,handleDeleteProduct ,handleNewArrivals,handleGetProductById,handleGetProductsByCategory}