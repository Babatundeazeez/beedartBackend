const express = require("express")
const app = express()
const PORT = 1500;
const cors = require('cors');
 
const connectedMongoDb = require("./ConnectedToMDB");
const userRouter = require("./Router/UserRouter");
connectedMongoDb()

app.use(express.json())
app.use(cors())
app.listen(PORT, () =>{
    console.log(`Listening to port : ${PORT}`);
    
})

app.use('/api/user', userRouter)


