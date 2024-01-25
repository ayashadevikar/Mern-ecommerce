// Create Token and saving in cookie

export const sendToken = (user, statusCode, res) => {
  // Generate JWT token for the user
  const token = user.getJWTToken();

  // Parse the duration string from process.env.COOKIE_EXPIRE
  const cookieExpireDuration = process.env.COOKIE_EXPIRE || '5d';
  const cookieExpireMilliseconds = parseInt(cookieExpireDuration, 10) * 24 * 60 * 60 * 1000;

  // Set options for the cookie, including expiration time
  const options = {
    expires: new Date(Date.now() + cookieExpireMilliseconds),
    httpOnly: true,
  };

  // Send the response with the token in the cookie
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });
};




// Create Token and saving in cookie

// export const sendToken = (user, statusCode, res) => {
//     const token = user.getJWTToken();
//     console.log("COOKIE_EXPIRE:", process.env.COOKIE_EXPIRE);
//     // options for cookie
//     const options = {
//       expires: new Date(
//         Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
//       ),
//       httpOnly: true,
//     };
  
//     res.status(statusCode).cookie("token", token, options).json({
//       success: true,
//       user,
//       token,
//     });
//   };
  
//   module.exports = sendToken;