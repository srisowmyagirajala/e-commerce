// Importing the Address model
const Address = require("../../models/Address");

/**
 * Add a new address for a user
 */
const addAddress = async (req, res) => {
  try {
    // Extract address data from request body
    const { userId, address, city, pincode, phone, notes } = req.body;

    // Validate if all required fields are present
    if (!userId || !address || !city || !pincode || !phone || !notes) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided!",
      });
    }

    // Create a new address instance
    const newlyCreatedAddress = new Address({
      userId,
      address,
      city,
      pincode,
      notes,
      phone,
    });

    // Save the address to the database
    await newlyCreatedAddress.save();

    // Send back the created address as a response
    res.status(201).json({
      success: true,
      data: newlyCreatedAddress,
    });
  } catch (e) {
    // Log and send error response in case of exception
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

/**
 * Fetch all addresses associated with a specific user
 */
const fetchAllAddress = async (req, res) => {
  try {
    const { userId } = req.params;

    // Check if userId is provided
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User id is required!",
      });
    }

    // Fetch all addresses from the database for the user
    const addressList = await Address.find({ userId });

    res.status(200).json({
      success: true,
      data: addressList,
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
 * Edit/update an existing address for a user
 */
const editAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    const formData = req.body; // Updated data

    // Validate presence of required params
    if (!userId || !addressId) {
      return res.status(400).json({
        success: false,
        message: "User and address id is required!",
      });
    }

    // Find and update the address
    const address = await Address.findOneAndUpdate(
      { _id: addressId, userId },
      formData,
      { new: true } // Return the updated document
    );

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    // Return updated address
    res.status(200).json({
      success: true,
      data: address,
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
 * Delete an address belonging to a user
 */
const deleteAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;

    // Validate the presence of required identifiers
    if (!userId || !addressId) {
      return res.status(400).json({
        success: false,
        message: "User and address id is required!",
      });
    }

    // Find and delete the address
    const address = await Address.findOneAndDelete({ _id: addressId, userId });

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    // Return success message
    res.status(200).json({
      success: true,
      message: "Address deleted successfully",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

// Export all address-related controllers
module.exports = { addAddress, editAddress, fetchAllAddress, deleteAddress };
