const mongoose = require("mongoose")
const userOrderSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    request : {
        type : String,
        required : true
    },
    size : {
        type : String,
        required : true
    },
    address : {
        type : String,
        required : true
    }
})
const userOrder = mongoose.model("userOrder", userOrderSchema)
module.exports = userOrder