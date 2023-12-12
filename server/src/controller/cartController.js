const CartModel = require("../model/cartModel");

const handleAddCartItem=async(req,res)=>{
    try {
        const { productId, quantity } = req.body;
        const userId = req.userId;
        
        const existingProduct = await CartModel.findOne({
            user: userId,
            'products.productId': productId,
          });

          if (existingProduct) {
            await CartModel.findOneAndUpdate(
              {
                user: userId,
                'products.productId': productId,
              },
              {
                $inc: { 'products.$.quantity': quantity },
              },
              { new: true }
            );
          }else {
            await CartModel.findOneAndUpdate(
              { user: userId },
              {
                $addToSet: {
                  products: { productId, quantity },
                },
              },
              { upsert: true, new: true }
            );
          }
      
          const updatedCart = await CartModel.findOne({ user: userId }).populate(
            'products.productId',
            'name price'
          );
      
          res.status(201).json({success:true,message:"Product add on cart successful",updatedCart})
    
    } catch (error) {
        return res.status(500).json({success:false,message:"Add to cart failed",error:error.message})
    }
}
const handleDeleteCartItem=async()=>{
    try {
        
    } catch (error) {
        console.log(error.message)
    }
}

module.exports={handleAddCartItem,handleDeleteCartItem}