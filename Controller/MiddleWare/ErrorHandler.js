const handleDuplicateError = (err) =>{
    const errorKey = Object.keys(err.keyValue)[0]
    const errorValue = Object.values(err.keyValue)[0]

    const errorMessage = new Error(`${errorKey} of ${errorValue} already exist`)

    const error = {
        statusCode : 400,
        message : errorMessage.message
    }

    return error;

}
///////////////////////////////////////////////

const handleValidationError = (err) =>{
    const message = Object.values(err.errors).map(error => error.message)
            return{
                statusCode : 400,
                message : message[0]
            }
    }

    ////////////////////////////////////////////////

    const handleCastError = (err) =>{
        const message = `${err.path} ${err.value} is invalid`
        const error = new Error(message)
        return {
            statusCode : 400,
            message : error.message
        }
    
    }


const errorHandler = (err, req, res, next) => {
    console.log("Error caught by middleware", err);
    
    if (err.code === 11000){
        const error = handleDuplicateError(err)

        return res.status(error.statusCode).json({
               message : error.message
           })
    }
    //////////////////////////////////

    if (err.name === "ValidationError"){
        const error = handleValidationError(err)
      return  res.status(error.statusCode).json({
            message : error.message
        })
    }
    //////////////////////////////////

    if (err.name === "CastError"){
        const error = handleCastError(err)
      return res.status(error.statusCode).json({
            message : error.message
        })
    }

    //////////////////////////////////

    //  //JWT Token
     if (err.name === "JsonWebTokenError") {
        return  res.status(401).json({
             message : "Invalid Token. Please login again"
         })
     }
     //JWT Token expire
      if(err.name === "TokenExpiredError"){
        return  res.status(401).json({
             message : "Your Token has Expire. Please log in again"
         })
     }
 
     else{
       return res.status(500).json({
        message : "something went wrong", 
        errorName: err.name || "Error", 
        errorCode: err.code || null
    })
     }



}
module.exports = errorHandler