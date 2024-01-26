import Product from "../models/product.schema.js"
import CustomError from "../utils/CustomError.js";

// create Product -- admin
export const createProduct = async (req,res,next) => {
   try {
    const product = await Product.create(req.body);

    res.status(200).json({
       sucess: true,
       message: "Product created successfully",
       product
    });

} catch (error) {
   console.log(error);
   res.status(400).json({
     success: false,
     message: error.message,
   });
 }
}

// get all product

export const getAllProducts = async (req,res) => {
   try {
      // const { name } = req.body
      // const { name } = req.query;
      // const queryObject = {};

      // if (name) {
      //    queryObject.name = { $regex: name, $options: "i" };
      // }
     const products = await Product.find({
      // name: { $regex: name, $options: "i" },
     });
  

     res.status(200).json({
        sucess: true,
        products
     })
   } catch (error) {
      console.log(error);
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }

}

// get Search

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

// Create New Review or Update the review
export const createProductReview = async (req, res, next) => {
   try {
     const { rating, comment, productId } = req.body;
 
     const review = {
       user: req.user._id,
       name: req.user.name,
       rating: Number(rating),
       comment,
     };
 
     let product = await Product.findById(productId);
 
     if (!product) {
       return res.status(404).json({
         success: false,
         message: 'Product not found.',
       });
     }
 
     const isReviewed = product.reviews.find(
       (rev) => rev.user.toString() === req.user._id.toString()
     );
 
     if (isReviewed) {
       product.reviews.forEach((rev) => {
         if (rev.user.toString() === req.user._id.toString()) {
           rev.rating = rating;
           rev.comment = comment;
         }
       });
     } else {
       product.reviews.push(review);
       product.numOfReviews = product.reviews.length;
     }
 
     let avg = 0;
 
     product.reviews.forEach((rev) => {
       avg += rev.rating;
     });
 
     product.ratings = avg / product.reviews.length;
 
     await product.save({ validateBeforeSave: false });
 
     res.status(200).json({
       success: true,
     });
   } catch (error) {
     console.log(error);
     res.status(400).json({
       success: false,
       message: error.message,
     });
   }
 };

//  Get All Reviews of a product
export const getProductReviews = async(req, res, next) => {
  try {
     
    const product = await Product.findById(req.query.id);

    if(!product) {
      return next(new CustomError("Product not found", 404))
    }

    res.status(200).json({
      sucess: true,
      reviews: product.reviews,
    })

  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: error.message,
  });
}
}

// Delete Review
export const deleteReview = async(req, res, next) => {
  try {
    const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new CustomError("Product not found", 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
    
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: error.message,
  })
}
}