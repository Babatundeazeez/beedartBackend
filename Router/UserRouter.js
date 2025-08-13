const express = require('express')
const { addUser, getUserById } = require('../Controller/userController')

const userRouter = express.Router()

userRouter.post("/", addUser)
userRouter.get("/:id", getUserById)

module.exports = userRouter