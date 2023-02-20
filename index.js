const express=require("express")
const { connection }=require("./configs/db")
const { userRouter }=require("./routes/User.route")
const { postRouter } =require("./routes/Post.route")
const {authenticate}=require("./middlewares/authenticate.middleware")
require("dotenv").config
const cors=require("cors")



const app=express()
app.use(cors({
    origin: "*"
}))

app.use(express.json())

app.get("/",(req,res)=>{
    res.send("HOME PAGE")
})

app.use("/users",userRouter)
app.use(authenticate)
app.use("/posts",postRouter)

app.listen(process.env.port, async()=>{
    try{
        await connection
        console.log("Connected to DB")
    }catch(err){
        console.log("Can not Connected to DB")
        console.log(err)
    }
    console.log(`running at port number ${process.env.port}`)
})