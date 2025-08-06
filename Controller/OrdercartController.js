const orderModel = require("../Model/OrderCartModel");

const placeCart = async(req, res) => {
    console.log("PlaceCart endPoint hit");
    

    try {
        const {carts, totalAmount} = req.body
        const userId = req.user.id;

        const orderCart = await orderModel.create({carts, totalAmount, userId})
        console.log("cartOrder endPoint hit");
        console.log("Request body",req.body);

        if (!orderCart){
            return res.status(400).json({
                status : "error",
                message : "Order was not created"
            })
        }
        res.status(200).json({
            status : "success",
            message : "Order was successfully placed",
            orderCart
        })
        

        
    } catch (error) {
        console.log("Order creation error",error);
        res.status(500).json({
            success : false,
            message : "Server error during Order Creation",
            error : error.message
        })
        
    }

}

// trackOrder/////////
const getUserOrder = async(req, res) => {
    try {
        const userId = req.user.id;
        const order = await orderModel.find({userId}).sort({createdAt: -1});
        if (!order){
            return res.status(401).json({
                status : "error",
                message : "Failed to get order"
            })
        }
        res.status(201).json({
            status : "success",
            message : "order was successfully fetch",
            order
        })
        
    } catch (error) {
        console.log("Error occur while fetching Order", error);
        res.status(500).json({
            status : "error",
            message : "Failed to fecth user order",
            error : error.message
        })
        
        
    }

}




module.exports = {
    placeCart,
    getUserOrder
}