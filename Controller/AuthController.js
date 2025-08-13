const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const userModel = require('../Model/User')
const generateRandomString = require("../utilities/GenRandom")
const sendverificationMail = require("../utilities/SendVerificationMail")

//////////////////////////////////////////////////////////
const signUp = async(req, res) =>{

    const {password, email, name} = req.body

    try {
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)

        const token = generateRandomString(8)  //generate token during sign up
        const verificationExp = Date.now() + 1000 * 60 * 30


        const user = await userModel.create({...req.body, password : hashPassword, verificationToken : token, verificationExp})

        if (!user){
            return res.status(400).json({
                status : "error",
                message : "could not sign up"
            })
        }
        res.status(200).json({
            status : "success",
            message : "sign Up successfully, check your email to verify your account",
            user
        })

        //destruction user name
        const userName = name.split( " ")[0]

        sendverificationMail(email, userName, token)
        
    } catch (error) {
        console.log(error);
        
    }

}
/////////////////////////////////////////////////////////////////////////////
const verifyEmail = async(req, res) =>{
    const {token} = req.params

   
    try {
        const user = await userModel.findOne({verificationToken : token})
        
        if(!user){
            return res.status(400).json({
                error : "error",
                message : "This token is invalid or it has been verified"
            })
        }
        if (user.verificationExp < Date.now()){
            return res.status(400).json({
                status: "error",
                message : "Verification time has expire",
                user
            })
        }

        await userModel.findByIdAndUpdate(user._id, {verificationExp : null, verificationToken : null, verified: true})

        res.status(200).json({
            status: "success",
            message : "Your Email has been verify, kindly proceed to login page"
        })

        
    } catch (error) {
        console.log(error);
        
    }
}
///////////////////////////////////////////////////////////////////////

const signIn = async(req, res) =>{

    const {email, password} = req.body
    try {
        const user = await userModel.findOne({email})
        if (!user){
            return res.status(400).json({
                status : "error",
                message : "Email or Password is incorrect"
            })
        }
        // verify if the password is correct
        const correctedPassword = await bcrypt.compare(password, user.password)

        if(!correctedPassword){
            return res.status(400).json({
                status : "error",
                message : "Email or Password is incorrect"
            })
        }
        ////////////////Generate accessToken for the user//////////
        const accessToken = jwt.sign({id: user._id, role: user.role, email: user.email}, process.env.jwt_pass,{expiresIn : process.env.tokenExp})

        
        
        res.status(200).json({
            status : "success",
            mesage : "Sign In successfully, please proceed to the dashboard",
            user,
            accessToken
        })


        
    } catch (error) {
        console.log(error);
       // next(error)
        
    }
}





module.exports = {
    signUp,
    verifyEmail,
    signIn
}

