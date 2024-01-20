// Importing required modules
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const authRoutes = require("./routes/auth");
const accountRoutes = require("./routes/account");
const transactionRoutes = require("./routes/transaction");
const billRoutes = require('./routes/bill');
const profileRoutes = require('./routes/profile');
const config = require("./config/config");
const cors = require("cors");

// Creating an Express application
const app = express();

// Configuring the port for the server
const PORT = config.serverPort;

// Middleware setup
// Parse incoming JSON requests
app.use(express.json());
// Morgan for logging HTTP requests in the console
app.use(morgan("dev"))
// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Routes setup
// Mounting different routes for specific endpoints
app.use("/auth", authRoutes);
app.use("/account", accountRoutes);
app.use("/transaction", transactionRoutes);
app.use('/bill', billRoutes);
app.use("/profile", profileRoutes);

// Welcome message for the root path
app.get("/", (req, res) => {
    res.send("Welcome to Siyabhanga online banking api!");
});

// Connect to MongoDB
// Using Mongoose to connect to MongoDB using the provided configuration
mongoose.connect(config.database, { useNewUrlParser: true, useUnifiedTopology: true });
console.log("Connected to MongoDB!");

// Start the server
// Listening on the specified port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Export the Express application for testing or other modules
module.exports = app;