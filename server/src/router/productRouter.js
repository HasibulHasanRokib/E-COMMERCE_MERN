const express=require('express')
const {handleGetProductsByCategory,handleCreateProduct,handleGetProducts,handleGetProduct,handleUpdateProduct,handleDeleteProduct, handleNewArrivals,handleGetProductById } = require('../controller/productController');
const {isLoggedIn , isAdmin} =require('../middleware/authMiddleware')

const router=express.Router();

//api/
router.post('/create-product',isLoggedIn,isAdmin,handleCreateProduct)
router.get('/products',handleGetProducts)
router.get('/products/category/:category',handleGetProductsByCategory)
router.get('/product/:slug',handleGetProduct)
router.get('/single-product/:id',handleGetProductById)
router.get('/new-products',handleNewArrivals)
router.post('/product-update/:id',isLoggedIn,isAdmin,handleUpdateProduct)
router.delete('/product-delete/:id',isLoggedIn,isAdmin,handleDeleteProduct)


module.exports=router; 