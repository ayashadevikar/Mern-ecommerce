import User from "../models/user.schema.js";
import { sendToken  } from "../utils/jwtToken.js"; 
import CustomError from "../utils/CustomError.js";
import { sendEmail } from "../utils/sendEmail.js";

export const registerUser = async (req,res,next) => {
  try {

    const { name, email, password } = req.body;

    const user = await User.create({
       name, email, password
      //  avatar:{
      // //   public_id: "this is a sample id",
      // //   url: "profilepicUrl"
      // //  }
   });
   
   const token = user.getJWTToken(); 

   sendToken(user, 201, res);

  //  res.status(200).json({
  //     sucess: true,
  //     message: "User created successfully",
  //     token,
  //  });

} catch (error) {
  console.log(error);
  res.status(400).json({
    success: false,
    message: error.message,
  });
}
}


// login User
export const loginUser = async (req,res,next) => {
  try {

    const { email, password } = req.body;

    // checking if user has given password and email both

    if (!email || !password){
      throw new CustomError("PLease fill all details", 400)
    }

    const user = await User.findOne({ email }).select("password");

    if (!user) {
      throw new CustomError("Invalid credentials", 400)
    }

    const isPasswordMatched = await user.comparePassword(password)

   const token = user.getJWTToken();
   
   sendToken(user, 200, res);

  //  res.status(200).json({
  //     sucess: true,
  //     message: "User created successfully",
  //     token,
  //  });

} catch (error) {
  console.log(error);
  res.status(400).json({
    success: false,
    message: error.message,
  });
}
}

// Logout User
export const logout = async (req, res, next) => {
  try {

  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
        sucess: true,
        message: "Log Out successfully",
        
     });
  

  } catch (error) {
  console.log(error);
  res.status(400).json({
    success: false,
    message: error.message,
  });
}
}

// Forgot Password
export const forgotPassword = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHander("User not found", 404));
  }

  // Get ResetPassword Token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/password/reset/${resetToken}`;

  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Ecommerce Password Recovery`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new CustomError(error.message, 500));
  }
};

// Reset Password
export const resetPassword = async (req, res, next) => {
  // creating token hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHander(
        "Reset Password Token is invalid or has been expired",
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHander("Password does not password", 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
};

// Get User Detail

export const getUserDetails = async(req, res, next) => {
   try {
       
         const user =  await User.findById(req.user.id);
    
    
      res.status(200).json({
      sucess: true,
      user,
    });

   } catch (error) {
     console.log(error);
     res.status(400).json({
     success: false,
     message: error.message,
  });
}


}

// Update User Password

export const updatePassword = async(req, res, next) => {
   try {
     
        const user = await User.findById(req.user.id).select("+password");

        const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

        if (!isPasswordMatched) {
          return next(new CustomError("Old password is incorrect", 400))
        }

        if(req.body.newPassword !==req.body.confirmPassword) {
          return next(new CustomError("Password does not match", 400));
        }

        user.password = req.body.newPassword;

        await user.save();

        res.status(200).json({
          sucess: true,
          user,
   });
   }
   catch (error) {
    console.log(error);
    res.status(400).json({
    success: false,
    message: error.message,
 });
}
   }

   // Update User Profile

export const updateProfile = async(req, res, next) => {
  try {
    
       const newUserData = {
          name: req.body.name,
          email: req.body.email,
       }

       const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
           new: true,
           runValidators: true,
           useFindAndModify: false,
       })

       res.status(200).json({
         sucess: true,
         
  });
  }
  catch (error) {
   console.log(error);
   res.status(400).json({
   success: false,
   message: error.message,
});
}
  }

  // Get all users(admin)
  export const getAllUser = async(req, res, next) => {
    try {
       
      const users = await User.find();

      res.status(200).json({
        sucess: true,
        users,
      })

    } catch (error) {
      console.log(error);
      res.status(400).json({
      success: false,
      message: error.message,
     });
    }
  }

  // Get single user (admin)
export const getSingleUser = async(req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if(!user){
      return next(new CustomError(`User does not exist with Id: ${req.params.id}`))
    }

    res.status(200).json({
      sucess: true,
      user,
    })

  } catch (error) {
    console.log(error);
      res.status(400).json({
      success: false,
      message: error.message,
    })
}  


}

 // Update User Role-- Admin

 export const updateUserRole = async(req, res, next) => {
  try {
    
       const newUserData = {
          name: req.body.name,
          email: req.body.email,
          role: req.body.role
       }

       const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
           new: true,
           runValidators: true,
           useFindAndModify: false,
       })

       res.status(200).json({
         sucess: true,
         
  });
  }
  catch (error) {
   console.log(error);
   res.status(400).json({
   success: false,
   message: error.message,
});
}
  }

  // Delete User -- Admin

 export const deleteUser = async(req, res, next) => {
  try {
    
          const user = await User.findById(req.params.id);

          if(!user){
              return next(new CustomError(`User does not exist with Id: ${req.params.id}`))
          }
             
          await user.remove();

          res.status(200).json({
            sucess: true,
            message: "User Deleted Successfully"
            
     });
    }
  catch (error) {
   console.log(error);
   res.status(400).json({
   success: false,
   message: error.message,
});
}
  }