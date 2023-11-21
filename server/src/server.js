const app= require("./app");
require('dotenv').config()
const mongoose=require('mongoose')

const PORT=process.env.PORT || 3000;

const connectDB=async()=>{
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log('DB connect successful.')
    } catch (error) {
        console.log('DB connect failed!')
    }
}

app.listen(PORT,async()=>{
    console.log(`server is running at http://localhost:${PORT}`)
    await connectDB()
})


