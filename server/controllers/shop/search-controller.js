const Product = require("../../models/Product");

/**
 * Search for products based on a keyword across multiple fields: title, description, category, and brand.
 */
const searchProducts = async (req, res) => {
  try {
    const { keyword } = req.params;

    // Validate keyword - must be a non-empty string
    if (!keyword || typeof keyword !== "string") {
      return res.status(400).json({
        succes: false, // Note: typo here – should be `success`
        message: "Keyword is required and must be in string format",
      });
    }

    // Create case-insensitive regular expression from the keyword
    const regEx = new RegExp(keyword, "i");

    // Define search criteria using $or to match keyword in any of these fields
    const createSearchQuery = {
      $or: [
        { title: regEx },
        { description: regEx },
        { category: regEx },
        { brand: regEx },
      ],
    };

    // Perform search in the Product collection
    const searchResults = await Product.find(createSearchQuery);

    // Return matching products
    res.status(200).json({
      success: true,
      data: searchResults,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

module.exports = { searchProducts };
