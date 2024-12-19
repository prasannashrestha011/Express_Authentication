import  express from "express";
import authRoute from './routes/authRoute'
import dotenv from 'dotenv'
const app=express()
app.use(express.json())
const PORT=process.env.PORT

dotenv.config()
app.use("/api/auth",authRoute)
console.log(process.env.JWT_SECRET)
app.listen(PORT,()=>{
    console.log(`Server running on PORT ${PORT}`)
})
