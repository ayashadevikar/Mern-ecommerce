import express from 'express';
const router = express.Router();

import {
  
    newOrder,
    getSingleOrder,
    myOrders
    

  } from "../controller/order.controller.js";
  
  import { isAuthenticatedUser, authorizeRoles } from "../middleware/auth.js";
  

  router.post("/newOrder", isAuthenticatedUser, newOrder);
  
  router.get("/getSingleOrder/:id", isAuthenticatedUser, authorizeRoles("admin"), getSingleOrder);

  router.get("/myOrders", isAuthenticatedUser,  myOrders);

  export default router;