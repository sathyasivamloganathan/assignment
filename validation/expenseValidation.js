// Validation schema for expense data
export const expenseValidation = {
  description: {
    notEmpty: {
      errorMessage: "Description should not be empty", // Error message if description is empty
    },
    isString: {
      errorMessage: "Description must be a string", // Error message if description is not a string
    },
  },
  paidBy: {
    notEmpty: {
      errorMessage: "PaidBy should not be empty", // Error message if paidBy is empty
    },
    isMongoId: {
      errorMessage: "PaidBy must be a valid MongoDB ObjectId", // Error message if paidBy is not a valid MongoDB ObjectId
    },
  },
  amount: {
    notEmpty: {
      errorMessage: "Amount should not be empty", // Error message if amount is empty
    },
    isFloat: {
      options: { min: 0 },
      errorMessage: "Amount must be a positive number", // Error message if amount is not a positive number
    },
  },
  participants: {
    isArray: {
      errorMessage: "Participants must be an array", // Error message if participants is not an array
    },
  },
  splitType: {
    notEmpty: {
      errorMessage: "SplitType should not be empty", // Error message if splitType is empty
    },
    isIn: {
      options: [["equal", "exact", "percentage"]],
      errorMessage: "SplitType must be one of ['equal', 'exact', 'percentage']", // Error message if splitType is not one of the allowed values
    },
  },
};
