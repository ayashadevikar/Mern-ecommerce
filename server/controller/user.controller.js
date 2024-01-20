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

   res.status(200).json({
      sucess: true,
      message: "User created successfully",
      user
   });

} catch (error) {
  console.log(error);
  res.status(400).json({
    success: false,
    message: error.message,
  });
}
}


export const home = (req, res) => {
  res.send("Hello from Backend");
};