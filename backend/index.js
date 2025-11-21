import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import { authRoutes } from './routes/authRoutes.js'
import { connectDB } from "./db/db.js"

dotenv.config()

connectDB()

const PORT = 8080 || process.env.PORT

const app = express()

app.use(express.urlencoded({extended:true}))

app.get("/api-check",async(req,res)=>{res.status(200).send({message:"Api is Working !"})})

app.use("/api/v1/auth",authRoutes)

app.listen(PORT,()=>{console.log("Server Started On Port " + PORT)})