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

// get all Orders -- Admin
export const getAllOrders = async (req, res, next) => {
  try{

  const orders = await Order.find();

  let totalAmount = 0;

  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
} catch (error) {
  res.status(400).json({
      success: false,
      message: error.message,
})
};
}

// update Order Status -- Admin
export const updateOrder = async (req, res, next) => {
  try {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new CustomError("Order not found with this Id", 404));
  }

  if (order.orderStatus === "Delivered") {
    return next(new CustomError("You have already delivered this order", 400));
  }

  if (req.body.status === "Shipped") {
    order.orderItems.forEach(async (o) => {
      await updateStock(o.product, o.quantity);
    });
  }
  order.orderStatus = req.body.status;

  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
} catch (error) {
  res.status(400).json({
      success: false,
      message: error.message,
})
};
}

async function updateStock(id, quantity) {
  const product = await Product.findById(id);

  product.Stock -= quantity;

  await product.save({ validateBeforeSave: false });
}

// delete Order -- Admin
export const deleteOrder = async (req, res, next) => {
  try {

  
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new CustomError("Order not found with this Id", 404));
  }

  await order.remove();

  res.status(200).json({
    success: true,
  });
} catch (error) {
  res.status(400).json({
      success: false,
      message: error.message,
})
};
}

