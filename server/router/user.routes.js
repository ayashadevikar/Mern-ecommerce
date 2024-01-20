import express from 'express';
const router = express.Router();
import {
  
  //  createProduct,
  // getUsers,
  // deleteUser,
  // editUser,
  registerUser
  // getUsersById
} from "../controller/user.controller.js";



// router.get("/", home)
router.post("/registerUser", registerUser);
// router.get("/getUsers", getUsers);
// router.get("/getUsersById/:id", getUsersById)
// router.put("/editUser/:id", editUser);
// router.delete("/deleteUser/:id", deleteUser);

export default router;