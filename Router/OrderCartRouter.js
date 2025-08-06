const express = require("express")
const { placeCart, getUserOrder } = require("../Controller/OrdercartController")
const authenticate = require("../Controller/MiddleWare/authenticate")

const cartRouter = express.Router()

cartRouter.post("/cartOrder", authenticate, placeCart)
cartRouter.get("/getOrder", authenticate, getUserOrder)







module.exports = cartRouter