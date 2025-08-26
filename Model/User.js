const mongoose = require('mongoose')

const userScheme = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required :  [true,"Email already axist"],
        unique : true
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
        required : true
    },
    role :{
        type : String,
        enum : ["user", "admin"],
        default : "user"
    },
    isVerify : {
        type : Boolean,
        default : false
    },
    verificationToken : {
        type : String
    },
    verificationExp : {
        type : Date,
        required : true
    },
    // userId : {
    //     type : String,
    //     required : true
    // }
})

const userModel = mongoose.model("users", userScheme)
module.exports = userModel