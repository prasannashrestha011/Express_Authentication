import  express from "express";
import authRoute from './routes/authRoute'

const app=express()
app.use(express.json())
const PORT=8080

app.use("/api/auth",authRoute)
app.listen(PORT,()=>{
    console.log(`Server running on PORT ${PORT}`)
})
