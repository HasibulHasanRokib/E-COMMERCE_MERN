const express=require('express');
const { handleAddCartItem, handleDeleteCartItem } = require('../controller/cartController');
const { isLoggedIn } = require('../middleware/authMiddleware');
const cartRouter=express.Router()

//api/cart/
cartRouter.post('/add-cart',isLoggedIn,handleAddCartItem)
cartRouter.delete('/delete-cart',handleDeleteCartItem)

module.exports=cartRouter;