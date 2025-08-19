const express = require("express")
const { creatBlog, getBlogPost, getSingleBlogPost } = require("../Controller/BlogController")
const loadImage = require("../Service/Multer")
const blogsRouters = express.Router()

blogsRouters.post("/",loadImage.single("image"), creatBlog)
blogsRouters.get('/', getBlogPost)
blogsRouters.get('/:id', getSingleBlogPost)




module.exports = blogsRouters