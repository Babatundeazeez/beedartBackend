const mongoose = require('mongoose')

const userScheme = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : [true,"Email already axist"]
    },
    address : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    age : {
        type : String,
        require : true
    },
    role :{
        type : String,
        enum : ["buyer", "seller", "admin"]
    },
    isVerify : {
        type : Boolean,
        dafault : false
    },
    verificationToken : {
        type : String
    },
    verificationExp : {
        type : Date,
        require : true
    },
    // userId : {
    //     type : String,
    //     required : true
    // }
})

const userModel = mongoose.model("users", userScheme)
module.exports = userModel