import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:[true, "Name is required"],
            trim:true,
            maxlength:[20, "Name must be of 20character"]
        },
       
        email:{
            type:String,
            required:[true,"Email is required"],
            unique:true,
            match: [/^\S+@\S+\.\S+$/, 'Please fill a valid email address'],
        },
        age: {
            type:Number,
            required:[true, "Age is required"],
            trim:true

        }
    },
    {
        timestamps:true
    }
)

export default mongoose.model("User", userSchema);