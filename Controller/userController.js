const userModel = require("../Model/User");

const addUser = async(req, res) =>{
    console.log(req.body);
    
    try {
        const user = await userModel.create(req.body)
        if(!user){
            return res.status(400).json({
                status : "error",
                message : "User could not found"
            })
        }
        res.status(200).json({
            status : "Success",
            message : "User is successfully Added"
        })
        
    } catch (error) {
        console.log(error);
        
    }
}

module.exports = {
    addUser
}