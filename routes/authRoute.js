import { Router } from "express";
import {
  getUserByIdController,
  loginController,
  registerController,
} from "../controller/authController.js";
import passport from "passport";
import { checkSchema } from "express-validator";
import { userValidation } from "../validation/userValidation.js";

// Create a new Router instance
const router = Router();

// Route for user registration with validation middleware
router.post("/register", checkSchema(userValidation), registerController);

// Route for user login using Passport's local strategy
router.get("/login", passport.authenticate("local"), loginController);

// Route for fetching user by ID
router.get("/getUser/:id", getUserByIdController);

// Export the router to be used in other parts of the application
export default router;
