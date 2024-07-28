import { Router } from "express";
import {
  createExpense,
  downloadBalanceSheet,
  individualExpense,
} from "../controller/expenseController.js";
import { LoginStatus } from "../middlewares/LoginMiddleware.js";
import { checkSchema } from "express-validator";
import { expenseValidation } from "../validation/expenseValidation.js";

// Create a new Router instance
const router = Router();

// Route for saving an expense with validation and login status check
router.post(
  "/expenseSave",
  LoginStatus,
  checkSchema(expenseValidation),
  createExpense
);

// Route for fetching individual expenses with login status check
router.get("/individualExpense/", LoginStatus, individualExpense);

// Route for downloading the balance sheet with login status check
router.get("/downloadBalanceSheet", LoginStatus, downloadBalanceSheet);

// Export the router to be used in other parts of the application
export default router;
