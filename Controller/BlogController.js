const blogModel = require("../Model/BlogContent");

const creatBlog = async(req, res) =>{
    const blogImage = req.file.path
    try {
        const blog = await blogModel.create({...req.body, image :blogImage})
        if(!blog){
            return res.status(400).json({
                status : "error",
                message : "blog post not created"
            })
        }
        res.status(200).json({
            status : " success",
            message : "Blog Post Create Successfully",
            blog
        })
        
    } catch (error) {
        console.log(error);
        
    }

}

const getBlogPost = async(req, res) =>{
    try {
        const blogPost = await blogModel.find()
       if(!blogPost){
        return res.status(400).json({
            status : "error",
            message : "faile to post blog"
        })
       }
       res.status(200).json({
        status : "success",
        message : "Blog Post successfully",
        blogPost
       })
        
    } catch (error) {
        console.log(error);
        
    }

}

const getSingleBlogPost = async(req, res) =>{
    const {id} = req.params
    try {
        const singleBlog = await blogModel.findById(id)
        if(!singleBlog) {
            return res.status(400).json({
                status : "error",
                message : "Blog Post Not found"
            })
        }
        res.status(200).json({
            status : "success",
            message : "Blog Post successfully create",
            singleBlog
        })
        
    } catch (error) {
        console.log(error);
        
        
    }

}

module.exports = {
    creatBlog,
    getBlogPost,
    getSingleBlogPost
}