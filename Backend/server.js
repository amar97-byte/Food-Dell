import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/food.route.js"
import userRouter from "./routes/user.route.js"
import "dotenv/config"




// App config
const app = express()
const PORT = 4000 


// middleware (passes all the request comes from frontend to backend)
app.use(express.json())
app.use(cors())


// DB connection
connectDB()


// api endpoints
app.use("/api/food",foodRouter)

app.use("/images" , express.static('uploads'))

app.use("/api/user" , userRouter)


app.get("/",(req,res)=>{
    res.send("API Working")
})


app.listen(PORT,()=>{
    console.log(`Server is Running At Port ${PORT}`);  
})

