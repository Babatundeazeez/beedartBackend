const express = require("express")

const app = express()
const helmet = require("helmet")
const cors = require('cors');
const connectedMongoDb = require("./ConnectedToMDB");

const PORT = 1500;




/////Routers////////
const userRouter = require("./Router/UserRouter");
const authRouter = require("./Router/AuthRouter");
const productRouter = require("./Router/ProductFraRouter");
const cartRouter = require("./Router/OrderCartRouter");
const userOrderRouter = require("./Router/UserOrderRouter");
const blogsRouters = require("./Router/BlogRouter");

//////MiddleWares/////////
app.use(express.json())
app.use(cors({
    origin: ["http://localhost:5173","https://beedaart.netlify.app"],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}))










/////helmet setUp//////////////////////

app.use(
    helmet.contentSecurityPolicy({
        directives:{
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "https://js.paystack.co"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", "data:", "https:"],
            connectSrc: ["'self'", "https://api.paystack.co"],
            objectSrc: ["'none'"],
            upgradeInsecureRequests: []
        }
    })
)

connectedMongoDb()

app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/userOrder', userOrderRouter)
app.use('/api/cart', cartRouter)
app.use('/api/blog', blogsRouters)



///////server Start //////
app.listen(PORT, () =>{
    console.log(`Listening to port : ${PORT}`);
    
})





