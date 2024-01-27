import express from 'express';
const router = express.Router();

import {
  
    newOrder,
    getSingleOrder,
    myOrders,
    getAllOrders,
    updateOrder,
    deleteOrder

    } from "../controller/order.controller.js";
  
  import { isAuthenticatedUser, authorizeRoles } from "../middleware/auth.js";
  

  router.post("/newOrder", isAuthenticatedUser, newOrder);
  
  router.get("/getSingleOrder/:id", isAuthenticatedUser, authorizeRoles("admin"), getSingleOrder);

  router.get("/myOrders", isAuthenticatedUser,  myOrders);

  router.get("/getAllOrders", isAuthenticatedUser, authorizeRoles("admin"), getAllOrders);

  router.put("/updateOrder/:id", isAuthenticatedUser, authorizeRoles("admin"), updateOrder);

  router.delete("/deleteOrder", isAuthenticatedUser, authorizeRoles("admin"), deleteOrder);


  export default router;