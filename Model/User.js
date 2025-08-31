const mongoose = require('mongoose')

const userScheme = new mongoose.Schema({
    name : {
        type : String,
        required : [true, "Name is required"]
    },
    email : {
        type : String,
        required :  [true,"Email is required"],
        unique : true
    },
    address : {
        type : String,
        required : [true, "Address is required"]
    },
    password : {
        type : String,
        required : true
    },
    
    role :{
        type : String,
        enum : ["user", "admin"],
        default : "user"
    },
    verified : {
        type : Boolean,
        default : false
    },
    verificationToken : {
        type : String
    },
    verificationExp : {
        type : Date,
        required : true,
        //default : ()=>Date.now() + 24 * 60 * 60 * 1000  //24hours
    },
    
})

const userModel = mongoose.model("users", userScheme)
module.exports = userModel