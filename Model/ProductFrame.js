const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({

    image : {
        type : String,
        required : true
    },
    productName : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    size : {
        type : String,
        required : true
    },
    category : {
        type : String,
        required : true

    },
    occasion : {
        type : String,
        required : true
    }

})
const productModel = mongoose.model("product", productSchema)
module.exports = productModel