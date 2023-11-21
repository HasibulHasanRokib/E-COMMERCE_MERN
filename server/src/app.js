const express=require('express')
const bodyParser=require('body-parser')
const cors=require('cors')
const cookieParser=require('cookie-parser')
const authRouter=require('./router/authRouter')



const app=express()

app.use(bodyParser.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors({credentials:true,origin:"http://localhost:5173"}))
app.use(express.static('public'));

//router
app.get('/',(req,res)=>{
    res.status(200).send("Welcome to the server.")
})

app.use('/auth',authRouter)

//router error
app.use((req,res,next)=>{
    res.status(404).send('Page not found!')
})

//server error
app.use((err,req,res,next)=>{
    console.error(err.stack)
    res.status(500).send('Something broke!')
})


module.exports=app;