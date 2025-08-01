const express = require("express")
const { addProduct, getProduct, getFilteredProducts, getSingleProduct } = require("../Controller/ProductFramController")
const loadImage = require("../Service/Multer")

const productRouter = express.Router()

productRouter.post('/', loadImage.single("image"), addProduct)


productRouter.get('/filter', getFilteredProducts)
productRouter.get('/',getProduct)
productRouter.get('/:id', getSingleProduct)







module.exports = productRouter