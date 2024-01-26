import Order from "../models/order.schema.js";
import Product from "../models/product.schema.js";
import CustomError from "../utils/CustomError.js";

// Create new Order
export const newOrder = async (req, res, next) => {
    try{
    const {
      shippingInfo,
      orderItems,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;
  
    const order = await Order.create({
      shippingInfo,
      orderItems,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      paidAt: Date.now(),
      user: req.user._id,
    });
  
    res.status(201).json({
      success: true,
      order,
    });

} catch (error) {
    res.status(400).json({
        success: false,
        message: error.message,
})
  };
}

// get Single Order
export const getSingleOrder = async (req, res, next) => {
  try{
 

  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new CustomError("Order not found with this Id", 404))
  }

  res.status(200).json({
    success: true,
    order,
  });

} catch (error) {
  res.status(400).json({
      success: false,
      message: error.message,
})
};
}

// get logged in user Orders
export const myOrders = async (req, res, next) => {
  try{
 

  const orders = await Order.find({ user: req.user_id });

  
  res.status(200).json({
    success: true,
    orders,
  });

} catch (error) {
  res.status(400).json({
      success: false,
      message: error.message,
})
};
}

