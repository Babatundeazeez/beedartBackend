const IsAdmin = (req, res, next) =>{
    // if (req.user && req.user.role === "admin"){
    //     next()
    // }
    // else{
    //     return res.status(400).json({
    //         status : "error",
    //         message : "Access denial, Admin can only add product"
    //     })
    // }
    try {
        if (!user){
            return res.status(401).json({
                status : "error",
                message : "Unauthorized. Please log in"
            })
        }
        if (req.user.role !== "admin"){
            return res.status(403).json({
                status : "error",
                message : "Access denied. Only Admin"
            })
        }
        next()
        
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message : "Server error in admin check"
        })
        
    }


}
module.exports = IsAdmin