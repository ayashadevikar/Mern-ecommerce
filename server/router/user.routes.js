import express from 'express';
const router = express.Router();
import {
  
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUser,
  getSingleUser,
  updateUserRole,
  deleteUser 
 
} from "../controller/user.controller.js";

import { isAuthenticatedUser, authorizeRoles } from "../middleware/auth.js";

const admin = "admin";

router.post("/registerUser", registerUser);

router.post("/loginUser", loginUser);

router.get("/logout", logout);

router.post("/forgotPassword", forgotPassword);

router.put("/password/reset/:token", resetPassword);

router.get("/getUserDetails", isAuthenticatedUser, getUserDetails);

router.put("/updatePassword", isAuthenticatedUser, updatePassword);

router.put("/updateProfile", isAuthenticatedUser, updateProfile);

router.get("/getAllUser", isAuthenticatedUser, authorizeRoles(admin), getAllUser);

router.get("/getSingleUser/:id", isAuthenticatedUser, authorizeRoles(admin), getSingleUser);

router.put("/updateUserRole", isAuthenticatedUser, authorizeRoles(admin), updateUserRole);

router.delete("/deleteUser", isAuthenticatedUser, authorizeRoles(admin), deleteUser);

export default router;