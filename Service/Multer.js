const multer = require("multer")
const { CloudinaryStorage } = require("multer-storage-cloudinary")
const cloudinaryConfig = require("./Cloudinary")


const storage = new CloudinaryStorage({
    cloudinary : cloudinaryConfig,
    params : {
        folders : "beedahArt",
        allowedFormats : ['png','jpeg','jpg'],
        transformation : [{width : 500, height : 500}]
    }
})
const loadImage = multer({storage})
module.exports = loadImage