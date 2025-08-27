const IsAdmin = (req, res, next) =>{
   
    try {
        if (!req.user){
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