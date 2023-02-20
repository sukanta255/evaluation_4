const mongoose=require("mongoose")

const postSchema=mongoose.Schema({
    "title":String,
    "body":String,
    "device":String,
    "no-if_comments":Number
})

const PostModel=mongoose.model("note",postSchema)

module.exports={
    PostModel
}

// {
//     "title":"coding",
//     "body":"nem assignment 1",
//     "device":"Laptop",
//     "no-if_comments":22
// }