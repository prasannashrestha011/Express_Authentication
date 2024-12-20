import  express from "express";
import authRoute from './routes/authRoute'
import contentRoute from './routes/contentRoute'
import dotenv from 'dotenv'
import { errorHandlers } from "./middleware/errorHandlers";
import cookieParser from 'cookie-parser'
import { authMiddleware } from "./middleware/authMiddleware";
dotenv.config()
const app=express()
const PORT=process.env.PORT

app.use(express.json())
//middlewares
app.use(errorHandlers) 
app.use(cookieParser())

//app routes
app.use("/api/auth",authRoute)
app.use(authMiddleware,contentRoute)


app.listen(PORT,()=>{
    console.log(`Server running on PORT ${PORT}`)
})
