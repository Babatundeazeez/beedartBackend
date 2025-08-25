const express = require("express")
const { addProduct, getProduct, getFilteredProducts, getSingleProduct } = require("../Controller/ProductFramController")
const loadImage = require("../Service/Multer")
const authenticate = require("../Controller/MiddleWare/authenticate")
const IsAdmin = require("../Controller/MiddleWare/IsAdmin")

const productRouter = express.Router()

productRouter.post('/', authenticate, IsAdmin, loadImage.single("image"), addProduct)


productRouter.get('/filter', getFilteredProducts)
productRouter.get('/',getProduct)  //dispay all product
productRouter.get('/:id', getSingleProduct)  ///get single product by id







module.exports = productRouter