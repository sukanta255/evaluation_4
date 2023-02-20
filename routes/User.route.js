const express=require("express")
const {UserModel}=require("../models/User.model")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
require("dotenv").config()

const userRouter=express.Router()

userRouter.get("/register",async(req,res)=>{
    const {name,email,gender,password,age,city}=req.body
    try{
        bcrypt.hash(password, 5 , async(err,secure_password)=>{
            if(err){
                console.log(err)
            } else {
                const user = new UserModel({name,email,gender,password:secure_password,age,city})
                await user.save()
                res.send({"msg":"User Registered Successfully"})
            }
        })
    }catch(err){
        res.send({"msg":"Something went wrong when Registering"})
        console.log(err)
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body
    try{
        const user=await UserModel.find({email})
        const hashed_pass=user[0].password
        if(user.length>0){
            bcrypt.compare(password, hashed_pass , (err,result)=>{
                if(result){
                    const token= jwt.sign({userID:user[0]._id},process.env.key)
                    res.send({"msg":"Login Successfull","token":token})
                } else {
                    res.send({"msg":"Wrong Credentials"})
                }
            });
        } else {
            res.send({"msg":"Wrong Credentials"})
        }
    }catch(err){
        res.send({"msg":"Something went wrong while Login"})
        console.log(err)
    }
})

module.exports={
    userRouter
}