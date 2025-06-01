const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const myMongooseUrl = process.env.mongooseUrl
const connectedMongoDb = async () =>{
    console.log('connecting.....');
    
    try {
        const connectedMyDb = await mongoose.connect(myMongooseUrl)
        if (connectedMyDb){
            console.log("MongoDb is currently connected....");
            
        }
        
    } catch (error) {
        console.log(error);
        
    }
}
module.exports = connectedMongoDb



