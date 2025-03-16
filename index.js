const express = require("express")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
dotenv.config()
const app = express()
const PORT = process.env.PORT
const cookieParser = require("cookie-parser")
const cors = require("cors")
const userRouter = require("./routes/userRoute")
const authMiddleware = require("./middleware/authMiddleware")

const DB_URL = process.env.MONGO_URL;


//middlewares
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: ['http://localhost:5173', 'https://netfilx-clone-jet.vercel.app'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))

//Routes
app.use("/api/v1/user", userRouter)



mongoose
    .connect(DB_URL)
    .then(() => console.log(`DB Connected successfully`))
    .catch(err => console.error("ERROR While Connecting DataBase", err))

app.listen(PORT, () => console.log(`Server is up in port ${PORT}`))