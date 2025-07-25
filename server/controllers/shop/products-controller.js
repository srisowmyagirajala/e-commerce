const Product = require("../../models/Product");

/**
 * Fetch products based on filters like category, brand, and sorting order.
 */
const getFilteredProducts = async (req, res) => {
  try {
    // Destructure filters from query parameters, provide default values
    const { category = [], brand = [], sortBy = "price-lowtohigh" } = req.query;

    let filters = {};

    // If category filter is applied, add it to the filter object
    if (category.length) {
      filters.category = { $in: category.split(",") };
    }

    // If brand filter is applied, add it to the filter object
    if (brand.length) {
      filters.brand = { $in: brand.split(",") };
    }

    // Define sorting logic based on 'sortBy' value
    let sort = {};
    switch (sortBy) {
      case "price-lowtohigh":
        sort.price = 1; // Ascending price
        break;

      case "price-hightolow":
        sort.price = -1; // Descending price
        break;

      case "title-atoz":
        sort.title = 1; // Alphabetical A-Z
        break;

      case "title-ztoa":
        sort.title = -1; // Alphabetical Z-A
        break;

      default:
        sort.price = 1; // Default to ascending price
        break;
    }

    // Fetch products from DB using filters and sorting options
    const products = await Product.find(filters).sort(sort);

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};

/**
 * Fetch a specific product by its ID.
 */
const getProductDetails = async (req, res) => {
  try {
    const { id } = req.params;

    // Find product by ID
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found!",
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};

module.exports = { getFilteredProducts, getProductDetails };
