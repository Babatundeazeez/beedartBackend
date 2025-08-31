const transporter = require("./Transpoter")

const sendverificationMail = (email, userName, token) =>{

    const myContent = {
        to : email,
        subject : "Welcome to BeedahArt! lets verify your account",
        from : "BeedahArt Beedart@gmail.com",
        replyTo : "BeedahArt@gmail.com",
        html : `
        <div class="container">
        <h1>Hi, ${userName}</h1>
        <p>Thanks you for Signing up on Beedart, we are thrilled to have you onboard!</p>
        <p>BeedahArt is an Arabic tutor, Digital Arabic Calligrapher, she create stunning designs and teach females islamic Eductation. she is a screen printer. </p>
        
        <div class="mt-2">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum tempora dolorem architecto distinctio temporibus nemo rem eligendi minima veritatis, eos consequatur, velit, fugit libero quo ipsa commodi est aliquid alias.</p>
        </div>
        <p><b>Please verify your Account here!</b> <a href="${process.env.client_domains}/verify/${token}"></a>Happy</p>
         <a className="btn btn-primary" href="${process.env.client_domains}/verify/${token}">
            <p><b>Please verify your Account! here</p>
        </a>
        <p>For more enquiry, please contact our support channel</p>
        <p>Thank you!</p>
        

    </div>`
    }

    transporter.sendMail(myContent, (err, info)=>{

        if(err){
            console.log(err.message);
            
        }
        else{
            console.log("email sent successfully");
            console.log(info);
        }
    })

}

module.exports = sendverificationMail