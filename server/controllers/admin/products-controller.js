// Importing Cloudinary image upload utility and Product model
const { imageUploadUtil } = require("../../helpers/cloudinary");
const Product = require("../../models/Product");

/**
 * Handles uploading an image to Cloudinary
 */
const handleImageUpload = async (req, res) => {
  try {
    // Convert image buffer to base64
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;

    // Upload the base64 image string to Cloudinary
    const result = await imageUploadUtil(url);

    // Respond with the image upload result
    res.json({
      success: true,
      result,
    });
  } catch (error) {
    // Log and return error
    console.log(error);
    res.json({
      success: false,
      message: "Error occured",
    });
  }
};

/**
 * Adds a new product to the database
 */
const addProduct = async (req, res) => {
  try {
    // Extract product details from request body
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
      averageReview,
    } = req.body;

    console.log(averageReview, "averageReview");

    // Create a new Product document
    const newlyCreatedProduct = new Product({
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
      averageReview,
    });

    // Save the product to the database
    await newlyCreatedProduct.save();

    // Respond with the saved product
    res.status(201).json({
      success: true,
      data: newlyCreatedProduct,
    });
  } catch (e) {
    // Handle errors
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

/**
 * Fetches all products from the database
 */
const fetchAllProducts = async (req, res) => {
  try {
    // Retrieve all products
    const listOfProducts = await Product.find({});

    // Return the list
    res.status(200).json({
      success: true,
      data: listOfProducts,
    });
  } catch (e) {
    // Handle errors
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

/**
 * Edits/Updates an existing product based on ID
 */
const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
      averageReview,
    } = req.body;

    // Find the product by ID
    let findProduct = await Product.findById(id);

    // If not found, respond with error
    if (!findProduct)
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });

    // Update product fields if new values are provided
    findProduct.title = title || findProduct.title;
    findProduct.description = description || findProduct.description;
    findProduct.category = category || findProduct.category;
    findProduct.brand = brand || findProduct.brand;
    findProduct.price = price === "" ? 0 : price || findProduct.price;
    findProduct.salePrice = salePrice === "" ? 0 : salePrice || findProduct.salePrice;
    findProduct.totalStock = totalStock || findProduct.totalStock;
    findProduct.image = image || findProduct.image;
    findProduct.averageReview = averageReview || findProduct.averageReview;

    // Save the updated product
    await findProduct.save();

    // Return updated product
    res.status(200).json({
      success: true,
      data: findProduct,
    });
  } catch (e) {
    // Handle errors
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

/**
 * Deletes a product from the database based on ID
 */
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Delete the product by ID
    const product = await Product.findByIdAndDelete(id);

    // If product not found, respond accordingly
    if (!product)
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });

    // Return success message
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (e) {
    // Handle errors
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

// Export controller functions for use in routes
module.exports = {
  handleImageUpload,
  addProduct,
  fetchAllProducts,
  editProduct,
  deleteProduct,
};
