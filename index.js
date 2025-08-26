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
const errorHandler = require("./Controller/MiddleWare/ErrorHandler");

//////MiddleWares/////////
app.use(express.json())
app.use(express.urlencoded({extended : true}))

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






/////Allow header///////////////////
app.use((req, res, next)=> {
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next();
})



app.use((req, res) => {
    res.status(404).json({
         message : `${req.method} ${req.originalUrl} is not an end point to this server`
    })
})

app.use(errorHandler);

///////server Start //////
app.listen(PORT, () =>{
    console.log(`Listening to port : ${PORT}`);
    
})