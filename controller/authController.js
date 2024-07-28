import { hashPassword } from "../helpers/authHelper.js";
import { User } from "../modal/UserSchema.js";
import { validationResult } from "express-validator";

// Controller for handling user registration
export const registerController = async (req, res) => {
  try {
    // Destructure required fields from request body
    const { name, email, mobile, password } = req.body;

    // Validate the request data
    const result = validationResult(req);
    if (!result.isEmpty())
      return res.status(400).send({ error: result.array() });

    // Check if the user already exists
    const existinguser = await User.findOne({ email });
    if (existinguser) {
      return res.status(200).send({
        success: false,
        message: "Already Registered. Please Login",
      });
    }

    // Hash the user's password
    const hashedPassword = await hashPassword(password);

    // Create a new user and save to the database
    const user = new User({
      name,
      email,
      mobile,
      password: hashedPassword,
    }).save();

    // Send success response
    res.status(201).send({
      success: true,
      message: "User Registered Successfully",
      user,
    });
  } catch (err) {
    console.log(err);
    // Send error response
    res.status(500).send({
      success: false,
      message: "Error in registration",
      err,
    });
  }
};

// Controller for handling user login
export const loginController = async (req, res) => {
  res.send({ message: "Login successful" });
};

// Controller for fetching user by ID
export const getUserByIdController = async (req, res) => {
  try {
    // Find user by ID from request params
    const findUser = await User.findById(req.params.id);
    if (!findUser) {
      return res.status(404).send({
        message: "User not found",
      });
    }

    // Send success response with found user
    return res.status(200).send({
      message: "User found",
      findUser,
    });
  } catch (error) {
    console.log(error);
    // Send error response
    res.status(500).send({
      message: "Error in fetching user",
      error,
    });
  }
};
