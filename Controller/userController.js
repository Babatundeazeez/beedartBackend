const userModel = require("../Model/User");
const { getUserOrder } = require("./OrdercartController");

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
            message : "User is successfully Added",
            user
        })
        
    } catch (error) {
        console.log(error);
        
    }
}

const getUserById = async(req, res) =>{
        
    try {
        const user = await userModel.findById(req.params.id)
        if(!user){
            return res.status(401).json({
                status : "error",
                message : "failed to get user Id"
            })

        }
        res.status(200).json({
            status: "success",
            message:"User Id found",
            user
        })
        
    } catch (error) {
        console.log(error);
        
        
    }
}

module.exports = {
    addUser,
    getUserById
    
}