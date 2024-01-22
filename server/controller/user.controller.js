import User from "../models/user.schema.js";

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

   res.status(200).json({
      sucess: true,
      message: "User created successfully",
      token,
   });

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

   res.status(200).json({
      sucess: true,
      message: "User created successfully",
      token,
   });

} catch (error) {
  console.log(error);
  res.status(400).json({
    success: false,
    message: error.message,
  });
}
}