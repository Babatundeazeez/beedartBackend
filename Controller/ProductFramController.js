const productModel = require("../Model/ProductFrame")

const addProduct = async(req, res) =>{
    const productImage = req.file.path
    try {
        const productFrame = await productModel.create({...req.body, image: productImage})
        console.log(req.body);
        if(!productFrame){
            return res.status(400).json({
                status : "error",
                message : "product not created"
            })
        }
        res.status(200).json({
            status : "success",
            message : "product successfully created",
            productFrame
        })
        
        
    } catch (error) {
        console.log(error);
        
    }

}

const getProduct = async(req, res) =>{
    try {
        const frameProduct = await productModel.find()
        if (!frameProduct){
            return res.status(400).json({
                status : "error",
                message : "failed to get product"
            })
        }
        res.status(200).json({
            status : "success",
            message : "product created successfully",
            frameProduct
        })
        
    } catch (error) {
        console.log(error);
        
    }
}
//////////////////////////////////////////////////////////////
    const getFilteredProducts = async (req, res) => {
            const { category, size, occasion } = req.query;
            
                let filters = {};

                if (category) filters.category = category;
                if (size) filters.size = size;
                if (occasion) filters.occasion = occasion;

                try {
                    const productFilter = await productModel.find(filters);
                    if (!productFilter.length){
                        return res.status(400).json({
                            status : "error",
                            message : "failed to filter"
                        })
                    }
                    res.status(200).json({
                        status : "success",
                        message : "filter sucessfully",
                        productFilter
                        
                    })
                    // res.json({ frameProduct: product });
                    
                } catch (error) {
                    res.status(500).json({ error: "Failed to fetch products" });
                }
                    
            
            }  
            ///////////////////////////////////////////////////////////

            const getSingleProduct = async(req, res) =>{
                const {id} = req.params
                try {
                    const singleFrameProduct = await productModel.findById(id)
                    if (!singleFrameProduct){
                        return res.status(400).json({
                            status : "error",
                            message : "Product not found"
                        })
                    }
                    res.status(200).json({
                        status : "Success",
                        message : "Product successfully ",
                        singleFrameProduct
                    })

                    
                } catch (error) {
                    console.log(error);
                    
                }

            }

module.exports = {
    addProduct,
    getProduct,
    getFilteredProducts,
    getSingleProduct
}