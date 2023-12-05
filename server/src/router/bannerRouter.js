const express=require('express');
const { handleAddBanner, handleGetBanner, handleDeleteBanner } = require('../controller/bannerController');
const {isAdmin, isLoggedIn} =require('../middleware/authMiddleware')
const bannerRouter=express.Router()

bannerRouter.post('/',isLoggedIn,isAdmin,handleAddBanner)
bannerRouter.get('/',handleGetBanner)
bannerRouter.delete('/:id',isLoggedIn,isAdmin,handleDeleteBanner)


module.exports=bannerRouter;