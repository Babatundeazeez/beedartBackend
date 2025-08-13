const userOrder = require("../Model/UserOrder");

const placeOrder =async (req, res) => {
    console.log(req.body);
    
    try {
        const order = await userOrder.create(req.body)
        if (!order){
            return res.status(401).json({
                status : "error",
                message : "order not establish"
            })
        }
        res.status(200).json({
            status : "success",
            message : "order was successfully place",
            order
        })
        
    } catch (error) {
        console.log(error);
        
        
    }

}
module.exports = {
    placeOrder
}