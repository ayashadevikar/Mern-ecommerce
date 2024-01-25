import express from 'express';
const router = express.Router();
import {
  
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword
 
} from "../controller/user.controller.js";




router.post("/registerUser", registerUser);
router.post("/loginUser", loginUser);
router.get("/logout", logout);
router.post("/forgotPassword", forgotPassword);
router.put("/password/reset/:token", resetPassword);
  

export default router;