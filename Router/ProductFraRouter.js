const express = require("express")
const { addProduct, getProduct, getFilteredProducts } = require("../Controller/ProductFramController")
const loadImage = require("../Service/Multer")

const productRouter = express.Router()

productRouter.post('/', loadImage.single("image"), addProduct)
productRouter.get('/',getProduct)
productRouter.get('/filter', getFilteredProducts)







module.exports = productRouter