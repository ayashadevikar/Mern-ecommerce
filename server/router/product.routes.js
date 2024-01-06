import express from 'express';
const router = express.Router();

import {
  
     createProduct,
     getAllProducts,
     updateProduct,
     deleteProduct,
     getProductDetails 
 
    // getUsersById
  } from "../controller/product.controller.js";
  
  
  
//   router.get("/", home)
  router.post("/createProduct", createProduct);
  router.get("/getAllProducts", getAllProducts);
  router.get("/getProductDetails/:id", getProductDetails)
  router.put("/updateProduct/:id", updateProduct );
  router.delete("/deleteProduct/:id", deleteProduct);
  
  export default router;