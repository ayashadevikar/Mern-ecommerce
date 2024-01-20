import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:[true, "Name is required"],
            trim:true,
            maxLength:[30, "Name must be of 30 characters"],
            minLength: [4, "Name should have more than 4 characters"]
        },
       
        email:{
            type:String,
            required:[true,"Email is required"],
            unique:true,
            match: [/^\S+@\S+\.\S+$/, 'Please fill a valid email address'],
        },
        password: {
            type: String,
            required: [true, "Please Enter Your Password"],
            minLength: [8, "Password should be greater than 8 characters"],
            select: false,

        },
        // avatar: {
        //     public_id: {
        //         type: String,
        //         required: true,
        //     }
        // },
        // url: {
        //     type: String,
        //     required: true,
        //   },
          role: {
            type: String,
            default: "user",
          },
          resetPasswordToken: String,
          resetPasswordExpire: Date,
        },
        
   
    {
        timestamps:true
    }
)

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      next();
    }
  
    this.password = await bcrypt.hash(this.password, 10);
  });

  // JWT TOKEN
    userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
  };

export default mongoose.model("User", userSchema);