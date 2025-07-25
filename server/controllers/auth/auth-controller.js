// Import necessary libraries
const bcrypt = require("bcryptjs"); // For password hashing
const jwt = require("jsonwebtoken"); // For generating JSON web tokens
const User = require("../../models/User"); // User model

/**
 * Registers a new user
 */
const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    // Check if a user with the same email already exists
    const checkUser = await User.findOne({ email });
    if (checkUser)
      return res.json({
        success: false,
        message: "User already exists with the same email! Please try again",
      });

    // Hash the password before saving it to the database
    const hashPassword = await bcrypt.hash(password, 12);

    // Create a new user document
    const newUser = new User({
      userName,
      email,
      password: hashPassword,
    });

    // Save the user to the database
    await newUser.save();

    // Respond with success message
    res.status(200).json({
      success: true,
      message: "Registration successful",
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
 * Logs in an existing user
 */
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists with the given email
    const checkUser = await User.findOne({ email });
    if (!checkUser)
      return res.json({
        success: false,
        message: "User doesn't exist! Please register first",
      });

    // Compare the given password with the hashed password stored in DB
    const checkPasswordMatch = await bcrypt.compare(
      password,
      checkUser.password
    );
    if (!checkPasswordMatch)
      return res.json({
        success: false,
        message: "Incorrect password! Please try again",
      });

    // Generate a JWT token with user information
    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
        userName: checkUser.userName,
      },
      "CLIENT_SECRET_KEY", // Secret key to sign the token
      { expiresIn: "60m" } // Token expires in 60 minutes
    );

    // Send token in HTTP-only cookie (prevents client-side access)
    res.cookie("token", token, { httpOnly: true, secure: false }).json({
      success: true,
      message: "Logged in successfully",
      user: {
        email: checkUser.email,
        role: checkUser.role,
        id: checkUser._id,
        userName: checkUser.userName,
      },
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
 * Logs out the user by clearing the token cookie
 */
const logoutUser = (req, res) => {
  res.clearCookie("token").json({
    success: true,
    message: "Logged out successfully!",
  });
};

/**
 * Middleware to protect routes and verify JWT
 */
const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;

  // If no token is provided
  if (!token)
    return res.status(401).json({
      success: false,
      message: "Unauthorised user!",
    });

  try {
    // Verify token using the same secret key
    const decoded = jwt.verify(token, "CLIENT_SECRET_KEY");

    // Attach decoded user info to request object
    req.user = decoded;

    // Continue to the next middleware or route
    next();
  } catch (error) {
    // Handle invalid or expired token
    res.status(401).json({
      success: false,
      message: "Unauthorised user!",
    });
  }
};

// Export all functions for use in routes
module.exports = { registerUser, loginUser, logoutUser, authMiddleware };
