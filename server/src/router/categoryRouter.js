const express=require('express');
const { handleCreateCategory,handleGetCategories,handleGetCategory ,handleUpdateCategory,handleDeleteCategory} = require('../controller/categoryController');
const router= express.Router()
const { isLoggedIn, isAdmin } = require('../middleware/authMiddleware')



//api/categories
router.post('/',isLoggedIn,isAdmin,handleCreateCategory)
router.get('/',isLoggedIn,isAdmin,handleGetCategories)
router.get('/:slug',handleGetCategory)
router.post('/:id',isLoggedIn,isAdmin,handleUpdateCategory)
router.delete('/:id',isLoggedIn,isAdmin,handleDeleteCategory)



module.exports=router;