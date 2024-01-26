// import jwt from "jsonwebtoken";
// import User from "../models/user.schema.js"
// import CustomError from "../utils/CustomError.js"

import jwt from "jsonwebtoken";
import { promisify } from "util";
import User from "../models/user.schema.js";
import CustomError from "../utils/CustomError.js";

const verifyToken = promisify(jwt.verify);

export const isAuthenticatedUser = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return next(new CustomError("Please Login to access this resource", 401));
    }

    const decodedData = await verifyToken(token, process.env.JWT_SECRET);

    req.user = await User.findById(decodedData.id);

    next();
  } catch (error) {
    return next(new CustomError("Invalid token, please log in again", 401));
  }
};


  export const authorizeRoles = (...roles) => {
      return (req, res, next) => {

         if(!roles.includes(req.user.role)) {
          return next (   
          new CustomError(
            `Role: ${req.user.role} is not allowed to access this resource`, 403
            ) 
            );
         }
         next();
      } 
    
     
  }