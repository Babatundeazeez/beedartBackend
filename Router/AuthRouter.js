const express = require("express")
const { signUp, signIn, verifyEmail } = require("../Controller/AuthController")
const authRouter = express.Router()



authRouter.post('/signUp', signUp)
authRouter.post('/signIn', signIn)
authRouter.post('/verify/:token', verifyEmail)

module.exports = authRouter
