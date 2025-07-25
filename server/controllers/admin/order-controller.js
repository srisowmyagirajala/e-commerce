// Importing the Order model from the models directory
const Order = require("../../models/Order");

// Controller to get all orders placed by all users (for admin usage)
const getAllOrdersOfAllUsers = async (req, res) => {
  try {
    // Fetch all orders from the database
    const orders = await Order.find({});

    // If there are no orders, return a 404 response
    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: "No orders found!",
      });
    }

    // If orders exist, send them in the response
    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (e) {
    // Handle unexpected errors
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

// Controller to get details of a specific order by its ID (for admin usage)
const getOrderDetailsForAdmin = async (req, res) => {
  try {
    // Extract order ID from request parameters
    const { id } = req.params;

    // Fetch order from the database using the ID
    const order = await Order.findById(id);

    // If the order doesn't exist, return a 404 response
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found!",
      });
    }

    // Send the order details in the response
    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (e) {
    // Handle unexpected errors
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

// Controller to update the status of an order (for admin usage)
const updateOrderStatus = async (req, res) => {
  try {
    // Extract order ID from request parameters and new status from request body
    const { id } = req.params;
    const { orderStatus } = req.body;

    // Find the order by ID
    const order = await Order.findById(id);

    // If the order doesn't exist, return a 404 response
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found!",
      });
    }

    // Update the order status in the database
    await Order.findByIdAndUpdate(id, { orderStatus });

    // Send success response
    res.status(200).json({
      success: true,
      message: "Order status is updated successfully!",
    });
  } catch (e) {
    // Handle unexpected errors
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

// Export the controller functions so they can be used in routes
module.exports = {
  getAllOrdersOfAllUsers,
  getOrderDetailsForAdmin,
  updateOrderStatus,
};
