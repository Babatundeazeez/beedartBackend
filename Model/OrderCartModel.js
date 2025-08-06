const mongoose = require("mongoose")
const orderCartSchema = new mongoose.Schema({

    userId : {
        type : String,
        required : true
    },
    carts : [

        {
        productId : String,
        productName : String,
        price : Number,
        quantity : Number
    }
    ],

    totalAmount : Number,
        createdAt : {
        type : Date, 
        default : Date.now
          },

        status : {
        type : String,
        default : "Pending"
        }


})
const orderModel = mongoose.model("order", orderCartSchema)
module.exports = orderModel
