import Product from "../models/product.schema.js"

// create Product -- admin
export const createProduct = async (req,res,next) => {

    const product = await Product.create(req.body);

    res.status(200).json({
       sucess: true,
       message: "Product created successfully",
       product
    })

}

// get all product

export const getAllProducts = async (req,res) => {

     const products = await Product.find();

     res.status(200).json({
        sucess: true,
        products
     })

}

// get product details

export const getProductDetails = async (req,res,next) => {

   const product = await Product.findById(req.params.id);

   if (!product) {
      return res.status(500).json({
       sucess:false,
       message:"Product not found"
      })
   }

   res.status(200).json({
      sucess: true,
      product
   })

}

// update product -- admin

export const updateProduct = async (req,res) => {
 
    let product = await Product.findById(req.params.id);

    if (!product) {
       return res.status(500).json({
        sucess:false,
        message:"Product not found"
       })
    }
  
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      });
    
      res.status(200).json({
        success: true,
        product
      });
}

// delete product

export const deleteProduct = async (req,res,next) => {
 
    const product = await Product.findById(req.params.id);

    if (!product) {
       return res.status(500).json({
        sucess:false,
        message:"Product not found"
       })
    }

    await product.remove();
  
    
      res.status(200).json({
        success: true,
        message: "Product deleted successfully",
      });
}