const express = require('express')
const { addUser } = require('../Controller/userController')

const userRouter = express.Router()

userRouter.post('/', addUser)

module.exports = userRouter