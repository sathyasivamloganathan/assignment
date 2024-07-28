## Expense Management System
This project is an Expense Management System built using Node.js, Express, MongoDB, and Passport.js for user authentication. It allows users to register, login, create expenses, get individual expense and download a balance sheet of their expenses.

# Server Installation and Setup

Follow these steps to set up and run the server-side application.

## Prerequisites

Ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/en/download/)
- [MongoDB](https://www.mongodb.com/try/download/community)

## Installation Steps

1. Create folder named "server" in your machine:
   ```bash
   cd server
   
2. **Clone the repository:**
   ```bash
   git clone https://github.com/sathyasivamloganathan/assignment.git

3. Install dependencies:
   ```bash
   npm install

4. Run the server
   ```bash
   npm start

## Features
1. User registration and login using Passport.js.
2. Input validation using express-validator.
3. Middleware for checking login status.
4. Expense creation and management.
5. Downloading balance sheet as a PDF.
   
## User Authentication and Authorization
User authentication and authorization are handled using Passport.js with a local strategy.<br />

Local Strategy: This strategy is used to authenticate users based on their email and password. When a user logs in, their credentials are checked against the stored data in MongoDB. If the credentials are valid, the user is authenticated.<br />

Serialization and Deserialization: Passport.js uses serialization to save the user's ID in the session and deserialization to retrieve the user information from the session on subsequent requests.<br />

Login Middleware: This middleware checks if a user is logged in by verifying if the user object exists in the request. If not, it responds with an error message, ensuring that only authenticated users can access certain routes.<br />

## Input Validation<br />
Input validation is crucial for ensuring the integrity and security of the data entered by users. This project uses express-validator to validate user input for registration and expense creation.<br />

## User Validation
Name: Must be a string, not empty, and between 2 and 32 characters.<br />
Email: Must be a valid email format and not empty.<br />
Mobile: Must be an integer, not empty, and a maximum of 10 digits.<br />
Password: Must be a string, not empty, and between 3 and 15 characters.<br />
## Expense Validation
Description: Must be a string and not empty.<br />
PaidBy: Must be a valid MongoDB ObjectId and not empty.<br />
Amount: Must be a positive number and not empty.<br />
Participants: Must be an array.<br />
SplitType: Must be one of "equal", "exact", or "percentage" and not empty.<br />

## Routes
## Auth Routes
1. POST /auth/register - Register a new user.
2. GET /auth/login - Login an existing user.
3. GET /auth/getUser/:id - Get user details by ID.
## Expense Routes
1. POST /expense/expenseSave - Create a new expense.
2. GET /expense/individualExpense - Get individual expenses of a logged-in user.
3. GET /expense/downloadBalanceSheet - Download balance sheet as a PDF.<br />

## 
1. Login Request with Thunder Client after Registration
   Endpoint: GET http://localhost:8080/api/auth/login
      ```bash
      {
        "email": "Enter email address",
        "password": "Enter password"
      }
      ```
   On successful login cookies are generated.<br />

2. Add Expense Request <br />
Endpoint: POST http://localhost:8080/api/expense/expenseSave<br />
      ```bash
      {
        "description": "Dinner",
        "paidBy": "66a64c5e19cb81b30651cad0",
        "amount": 800,
        "participants": [
          {"user": "66a64af609bbdaa411d22904"},
          {"user": "66a5093c44c0c51ab91164c8"}
        ],
        "splitType": "equal"
      }
      ```
The paidBy user id is got from the login cookies. If split Type is percentage, then in participants array next to user percentage must be provided to split amount into given percentage.<br />

3. Individual Expense Request<br />
Endpoint: GET http://localhost:8080/api/expense/individualExpense<br />
Authentication: Cookie-based session<br />
Upon a successful request, the response will include the total amount the user owes and details of each individual expense they are part of. Also it provides the description of the amount spend, paidBy name and their details, Individual amount needs to be paid for the session. <br />

## Login Middleware<br />
This middleware checks if the user is authenticated by verifying the presence of the user object in the request. If the user is not authenticated, it responds with a "Not Logged In" message.<br />

## Helpers
Auth Helper:<br />
1. hashPassword: Hashes the user's password using bcrypt before saving it to the database.<br />
2. comparePassword: Compares a plain text password with a hashed password.<br />
## Balance Sheet Helper:<br />
Endpoint: GET http://localhost:8080/api/expense/downloadBalanceSheet<br />
generateBalanceSheet: Generates a PDF balance sheet for the user's expenses, detailing each expense, who paid, and the user's share.<br />
1. Send the Request: Make sure the user is logged in and has a valid session. Send the GET request to the downloadBalanceSheet endpoint.<br />
2. Receive the Response: The server will process the request and generate a PDF file containing the balance sheet.<br />
3. Download the File: Your browser or API client tool will prompt you to download the PDF file. Save it to your desired location.<br />
![Balance Sheet](https://github.com/sathyasivamloganathan/assignment/blob/main/BalanceSheet/Balance%20Sheet.png)
