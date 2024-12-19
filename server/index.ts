import  express from "express";
import authRoute from './routes/authRoute'
import dotenv from 'dotenv'
import { errorHandlers } from "./middleware/errorHandlers";
 dotenv.config()
const app=express()
const PORT=process.env.PORT

app.use(express.json())
//middlewares
app.use(errorHandlers) 

//app routes
app.use("/api/auth",authRoute)


app.listen(PORT,()=>{
    console.log(`Server running on PORT ${PORT}`)
})
