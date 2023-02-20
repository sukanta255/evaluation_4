const jwt=require("jsonwebtoken")
require("dotenv").config()

const authenticate=(req,res,next)=>{
    const token=req.headers.authorization
    if(token){
        const decoded=jwt.verify(token,process.env.key)
        if(decoded){
            const userID=decoded.userID
            console.log(decoded)
            req.body.userId=userID
            next()
        } else {
            res.send({"msg":"User already exist, please login"})
        }
    } else {
        res.send({"msg":"User already exist, please login"})
    }
}

module.exports={
    authenticate
}