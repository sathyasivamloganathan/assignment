import express from "express";
import connectDb from "./config/ConnectDB.js";
import cors from "cors";
import authRoute from "../server/routes/authRoute.js";
import expenseRoute from "../server/routes/expenseRoute.js";
import session from "express-session";
import passport from "passport";
import mongoStore from "connect-mongo";
import mongoose from "mongoose";
import "./passport-startergies/passport-local.js"; // Import passport strategies

const app = express();
const PORT = 8080;

// Connect to the database
connectDb();

// Middleware to parse JSON requests
app.use(express.json());

// Middleware for session handling
app.use(
  session({
    secret: "4idjijcirni2s ja 9jdij", // Secret for session encryption
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 60000 * 60, // Session cookie max age (1 hour)
    },
    store: mongoStore.create({
      client: mongoose.connection.getClient(), // Use MongoDB to store session data
    }),
  })
);

// Initialize Passport for authentication
app.use(passport.initialize());
app.use(passport.session());

// Middleware to handle Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Define routes for authentication and expenses
app.use("/api/auth", authRoute);
app.use("/api/expense", expenseRoute);

// Default route to test server status
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log("Server is running on port 8080");
});
