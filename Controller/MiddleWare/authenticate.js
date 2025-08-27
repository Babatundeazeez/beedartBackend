const jwt = require("jsonwebtoken");
const userModel = require("../../Model/User");


//is it logged In
const authenticate = async(req, res, next) =>{
   
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({status : "error", message : "No Authorized, No token provided"})
    }
   
    const token = authHeader.split(" ")[1];

    try {
       
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        //fetch user from DB
        const user = await userModel.findById(decoded.id)

        if(!user){
            return res.status(400).json({
                status: "error",
                message: "User not found. Please log in again., This token belongs to no one"
            })
        }
        req.user = user
        // req.user = decoded

       // console.log("DECODED:", decoded);
       console.log(req.user);
       
    
        next()

        
    } catch (error) {
        return res.status(401).json({status : "error", message : "Invalid token", error : err.message})
        
        
    }

}
module.exports = authenticate