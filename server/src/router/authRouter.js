const express=require('express')
const { handleSignUp,handleSignIn,handleGoogleAuth,handleSignOut ,handleUserUpdate,handleUpdatePassword,handleForgetPassword,handleRestPassword} = require('../controller/authController')
const { isLoggedIn } = require('../middleware/authMiddleware')


const router=express.Router()

router.post('/user/sign-up',handleSignUp)
router.post('/user/sign-in',handleSignIn)
router.post('/google',handleGoogleAuth)
router.get('/user/sign-out',isLoggedIn,handleSignOut)
router.post('/user/:id',isLoggedIn,handleUserUpdate)
router.post('/user-password/:id',isLoggedIn,handleUpdatePassword)
router.post('/forgot-password',handleForgetPassword)
router.post('/reset-password/:token',handleRestPassword)


module.exports=router