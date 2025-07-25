// Import the Feature model
const Feature = require("../../models/Feature");

/**
 * Add a new feature image to the database
 */
const addFeatureImage = async (req, res) => {
  try {
    // Extract image from the request body
    const { image } = req.body;

    console.log(image, "image");

    // Create a new Feature document with the image
    const featureImages = new Feature({
      image,
    });

    // Save the image to the database
    await featureImages.save();

    // Return a success response with the saved image data
    res.status(201).json({
      success: true,
      data: featureImages,
    });
  } catch (e) {
    // Log any errors and return a server error response
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};

/**
 * Fetch all feature images from the database
 */
const getFeatureImages = async (req, res) => {
  try {
    // Retrieve all feature image documents
    const images = await Feature.find({});

    // Send the retrieved images in the response
    res.status(200).json({
      success: true,
      data: images,
    });
  } catch (e) {
    // Log any errors and return a server error response
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};

// Export the controller functions for use in routes
module.exports = { addFeatureImage, getFeatureImages };
