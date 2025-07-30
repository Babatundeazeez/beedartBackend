const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
    host : "smtp.gmail.com",
    service : "gmail",
    secure : false,
    port : 587,
    auth : {
        user : process.env.nodemailer_email,
        pass : process.env.nodemailer_Password
    }
})

module.exports = transporter

transporter.verify((err, success)=>{
    if (success){
        console.log("Ready to send Email message");
        
    }
    else{
        console.log(err);
        
    }

})