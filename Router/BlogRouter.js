const express = require("express")
const { creatBlog, getBlogPost, getSingleBlogPost } = require("../Controller/BlogController")
const loadImage = require("../Service/Multer")
const authenticate = require("../Controller/MiddleWare/authenticate")
const IsAdmin = require("../Controller/MiddleWare/IsAdmin")
const blogsRouters = express.Router()

blogsRouters.post("/", authenticate, IsAdmin ,loadImage.single("image"), creatBlog)
blogsRouters.get('/', getBlogPost)
blogsRouters.get('/:id', getSingleBlogPost)




module.exports = blogsRouters