const express = require("express")
const app = express()
const PORT = 1500;
const cors = require('cors');
 
const connectedMongoDb = require("./ConnectedToMDB");
const userRouter = require("./Router/UserRouter");
const authRouter = require("./Router/AuthRouter");
const productRouter = require("./Router/ProductFraRouter");


app.use(express.json())
app.use(cors())

app.listen(PORT, () =>{
    console.log(`Listening to port : ${PORT}`);
    
})
connectedMongoDb()

app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/product', productRouter)



