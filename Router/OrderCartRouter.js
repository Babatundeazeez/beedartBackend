const express = require("express")
const { placeCart, getUserOrder, upDateOrderStatus } = require("../Controller/OrdercartController")
const authenticate = require("../Controller/MiddleWare/authenticate")

const cartRouter = express.Router()

cartRouter.post("/cartOrder", authenticate, placeCart)
cartRouter.get("/getOrder", authenticate, getUserOrder)
cartRouter.put("/updateOrder/:id",authenticate, upDateOrderStatus)







module.exports = cartRouter