// Validation schema for user data
export const userValidation = {
  name: {
    isLength: {
      options: {
        min: 2,
        max: 32,
      },
      errorMessage: "Name should be in desired length between 2 - 32", // Error message if name is not within the specified length
    },
    notEmpty: {
      errorMessage: "Name should not be empty", // Error message if name is empty
    },
    isString: {
      errorMessage: "Name must be a string", // Error message if name is not a string
    },
  },
  email: {
    isEmail: {
      errorMessage: "Email should be entered", // Error message if email is not a valid email
    },
    notEmpty: {
      errorMessage: "Email should not be empty", // Error message if email is empty
    },
  },
  mobile: {
    isLength: {
      options: {
        min: 0,
        max: 10,
      },
      errorMessage: "Mobile number should be in desired length of max 10", // Error message if mobile number is not within the specified length
    },
    isInt: {
      errorMessage: "Mobile number should be Integer", // Error message if mobile number is not an integer
    },
    notEmpty: {
      errorMessage: "Mobile number should not be empty", // Error message if mobile number is empty
    },
  },
  password: {
    isLength: {
      options: {
        min: 3,
        max: 15,
      },
      errorMessage: "Password should be in desired length of max 15", // Error message if password is not within the specified length
    },
    notEmpty: {
      errorMessage: "Password should not be empty", // Error message if password is empty
    },
  },
};
