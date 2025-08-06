const express = require("express")
const app = express()
const PORT = 1500;

const cors = require('cors');
const connectedMongoDb = require("./ConnectedToMDB");

/////Routers////////
const userRouter = require("./Router/UserRouter");
const authRouter = require("./Router/AuthRouter");
const productRouter = require("./Router/ProductFraRouter");
const cartRouter = require("./Router/OrderCartRouter");

//////MiddleWares/////////
app.use(express.json())
app.use(cors())

///////server Start //////
app.listen(PORT, () =>{
    console.log(`Listening to port : ${PORT}`);
    
})

connectedMongoDb()

app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/product', productRouter)

app.use('/api/cart', cartRouter)



