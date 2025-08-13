const express = require("express")
const { placeOrder } = require("../Controller/UserOrderController")

const userOrderRouter = express.Router()

userOrderRouter.post("/", placeOrder)

module.exports = userOrderRouter