const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const userModel = require('../Model/User')
const generateRandomString = require("../utilities/GenRandom")
const sendverificationMail = require("../utilities/SendVerificationMail")

//////////////////////////////////////////////////////////
const signUp = async(req, res, next) =>{

    

    try {
        const {password, email, name} = req.body

        ////Hash password///////////////////////
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)


        ////verify token////////
        const token = generateRandomString(8)  //generate token during sign up
        const verificationExp = Date.now() + 1000 * 60 * 30



        ////create user//////////
        const user = await userModel.create({...req.body, password : hashPassword, role: req.body.role || "user", verificationToken : token, verificationExp})

         //destruction user name email verification//////

         const userName = name.split( " ")[0]

         sendverificationMail(email, userName, token)
//////////////////////////////////

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

       


        
    } catch (err) {
        console.error("Sign Up error",err);
        next(err)
        
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

        
    } catch (err) {
        console.log(err);
       // next(err)
        
    }
}
///////////////////////////////////////////////////////////////////////

const signIn = async(req, res, next) =>{

    const {email, password} = req.body
    try {
        const user = await userModel.findOne({email})
        if (!user){
            return res.status(400).json({
                status : "error",
                message : "Email or Password is incorrect"
            // const err = new Error("Email or Password is incorrect");
            // err.statusCode = 400;
            // throw err;
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
        const accessToken = jwt.sign({id: user._id, role: user.role, email: user.email}, process.env.JWT_SECRET,{expiresIn : process.env.tokenExp})

        
        
        res.status(200).json({
            status : "success",
            mesage : "Sign In successfully, please proceed to the dashboard",
            user,
            accessToken
        })


        
    } catch (err) {
        console.error(err);
        next(err)
        
    }
}





module.exports = {
    signUp,
    verifyEmail,
    signIn
}

