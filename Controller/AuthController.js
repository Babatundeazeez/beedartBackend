const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const userModel = require('../Model/User')
const generateRandomString = require("../utilities/GenRandom")
const sendverificationMail = require("../utilities/SendVerificationMail")

//////////////////////////////////////////////////////////
const signUp = async(req, res, next) =>{

    try {
        const {password, email, name} = req.body

         // check if email already exists
     const existingUser = await userModel.findOne({ email });
     if (existingUser) {

        return res.status(400).json({
            status : "error",
            message : "Email already exists"
        })
    
        // return next({ statusCode: 400, message: "Email already exists" });
       
     }


        ////Hash password///////////////////////
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)


        ////verify token////////
        const token = generateRandomString(8)  //generate token during sign up
        const verificationExp = Date.now() + 1000 * 60 * 30



        ////create user//////////
        const user = await userModel.create({...req.body, password : hashPassword, role: req.body.role || "user", verificationToken : token, verificationExp})

        if (!user){
           

            return res.status(400).json({
                statusCode : "error",
                message : "could not sign up"
            })
        }

         //send verification email  user name email verification//////

         const userName = name.split( " ")[0]

         sendverificationMail(email, userName, token)
////   
        res.status(200).json({
            status : "success",
            message : "sign Up successfully, check your email to verify your account",
            user,
        });
        
    } catch (err) {
        console.log(err);
        next(err)
        
    }

}

/////////////////////////////////////////////////////////////////////////////
const verifyEmail = async(req, res, next) =>{
    const {token} = req.params

   
    try {
        const user = await userModel.findOne({verificationToken : token})
        
        if(!user){
           
            const error = new Error("Invalid or already verified token");
            error.statusCode = 400;
            throw error;
        }
        if (user.verificationExp < Date.now()){
           
            const error = new Error("Verification time has expired");
            error.statusCode = 400;
            throw error;
        }

        await userModel.findByIdAndUpdate(user._id, {verificationExp : null, verificationToken : null, verified: true})

        res.status(200).json({
            status: "success",
            message : "Your Email has been verify, kindly proceed to login page"
        })

        
    } catch (err) {
       // console.log(err);
        next(err)
        
    }
}
///////////////////////////////////////////////////////////////////////

const signIn = async(req, res, next) =>{

    
    try {
        const {email, password} = req.body

        const user = await userModel.findOne({email})
        if (!user){
           
            const error = new Error("User Not Found")
            error.statusCode = 404;
            throw error;
        }

        // verify if the password is correct
        const correctedPassword = await bcrypt.compare(password, user.password)

        if(!correctedPassword){
           
            const error = new Error("Invalid credentials");
            error.statusCode = 401;
            throw error;
        }

        if (!user.verified) {
           
            const error = new Error("Please verify your email before logging in");
            error.statusCode = 403;
            throw error;
          }
          
        ////////////////Generate accessToken for the user//////////

        const accessToken = jwt.sign(
            {id: user._id, role: user.role, email: user.email}, 
            process.env.JWT_SECRET,{expiresIn : process.env.tokenExp})

        
        
        res.status(200).json({
            status : "success",
            mesage : "Sign In successfully, please proceed to the dashboard",
            accessToken,
            user,
            
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

