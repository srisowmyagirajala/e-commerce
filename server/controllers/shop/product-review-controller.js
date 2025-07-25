const Order = require("../../models/Order");
const Product = require("../../models/Product");
const ProductReview = require("../../models/Review");

/**
 * Adds a product review.
 * Only users who purchased the product can review it.
 */
const addProductReview = async (req, res) => {
  try {
    const { productId, userId, userName, reviewMessage, reviewValue } = req.body;

    // Check if the user has purchased the product
    const order = await Order.findOne({
      userId,
      "cartItems.productId": productId,
      // Uncomment and modify this if you want to restrict reviews to delivered or confirmed orders only
      // orderStatus: { $in: ["confirmed", "delivered"] }
    });

    // If no valid order is found, block the review
    if (!order) {
      return res.status(403).json({
        success: false,
        message: "You need to purchase product to review it.",
      });
    }

    // Check if the user has already submitted a review for the product
    const checkExistinfReview = await ProductReview.findOne({
      productId,
      userId,
    });

    if (checkExistinfReview) {
      return res.status(400).json({
        success: false,
        message: "You already reviewed this product!",
      });
    }

    // Create and save new product review
    const newReview = new ProductReview({
      productId,
      userId,
      userName,
      reviewMessage,
      reviewValue,
    });

    await newReview.save();

    // Fetch all reviews to calculate new average rating
    const reviews = await ProductReview.find({ productId });
    const totalReviewsLength = reviews.length;
    const averageReview =
      reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
      totalReviewsLength;

    // Update the product with new average review score
    await Product.findByIdAndUpdate(productId, { averageReview });

    // Send response with the new review
    res.status(201).json({
      success: true,
      data: newReview,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

/**
 * Retrieves all reviews for a specific product.
 */
const getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;

    // Fetch all reviews for the given product
    const reviews = await ProductReview.find({ productId });

    res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

module.exports = { addProductReview, getProductReviews };
