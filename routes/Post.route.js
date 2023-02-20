const express=require("express")
const {PostModel}=require("../models/Post.model")
const postRouter=express.Router()
require("dotenv").config();

postRouter.get("/",async(req,res)=>{
    try{
        const notes=await PostModel.find()
        res.send(notes)
    }catch(err){
        console.log(err)
        res.send({"msg":"Something went wrong"})
    }
})

postRouter.post("/create",async(req,res)=>{
    const payload=req.body
    try{
        const new_note=new PostModel(payload)
        await new_note.save()
        res.send("Created the post")
    }catch(err){
        console.log(err)
        res.send({"msg":"Something went wrong"})
    }
})

postRouter.patch("/update/:id",async(req,res)=>{
    const payload=req.body
    const id=req.params.id
    const note=await PostModel.findOne({"_id":id})
    const userID_in_note=note.userID_in_post
    const userID_in_making_req=req.body.userID

    try{
        if(userID_in_making_req!==userID_in_note){
            res.send({"msg":"You are not authorized person"})
        } else {
            await PostModel.findByIdAndUpdate({"_id":id},payload)
            res.send("Post Updated Successfully")
        }
    }catch(err){
        console.log(err)
        res.send({"msg":"Something went wrong"})
    }
})

postRouter.delete("/delete/:id",async(req,res)=>{
    const id=req.params.id
    const note=await PostModel.findOne({"_id":id})
    const userID_in_note=note.userID_in_post
    const userID_in_making_req=req.body.userID

    try{
        if(userID_in_making_req!==userID_in_note){
            res.send({"msg":"You are not authorized person"})
        } else {
            await PostModel.findByIdAndDelete({"_id":id})
            res.send("Post Deleted Successfully")
        }
    }catch(err){
        console.log(err)
        res.send({"msg":"Something went wrong"})
    }
})

module.exports={
    postRouter
}