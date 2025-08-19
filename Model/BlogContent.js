const mongoose = require("mongoose")

const BlogSchema = new mongoose.Schema({
    image : {
        type : String,
        require : true
    },
    title : {
        type : String,
        require : true
    },
    header : {
        type : String,
        require : true
    },
    content : {
        type : String,
        require : true
    },
    createdAt : {
        type : Date,
        default : Date.now()
    }
})
const blogModel = mongoose.model("blogs", BlogSchema)
module.exports = blogModel