import express from 'express';
const router = express.Router();

import {
  
     createProduct,
     getAllProducts,
     updateProduct,
     deleteProduct,
     getProductDetails,
     createProductReview,
     getProductReviews,
     deleteReview

  } from "../controller/product.controller.js";
  
  import { isAuthenticatedUser, authorizeRoles } from "../middleware/auth.js";
  
//   router.get("/", home)
  router.post("/createProduct", isAuthenticatedUser, authorizeRoles("admin"),  createProduct);
  router.get("/getAllProducts", getAllProducts);
  router.get("/getProductDetails/:id", getProductDetails)
  router.put("/updateProduct/:id", isAuthenticatedUser,   authorizeRoles("admin"), updateProduct );
  router.delete("/deleteProduct/:id", isAuthenticatedUser,  authorizeRoles("admin"), deleteProduct);
  router.put("/createProductReview", isAuthenticatedUser,   createProductReview);
  router.get("/getProductReviews", getProductReviews)
  router.delete("/deleteReview", isAuthenticatedUser,  deleteReview);
  
  export default router;