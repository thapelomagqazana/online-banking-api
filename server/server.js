const express = require("express");
const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
const morgan = require("morgan");
const authRoutes = require("./routes/auth");
const accountRoutes = require("./routes/account");
const transactionRoutes = require("./routes/transaction");
const billRoutes = require('./routes/bill');
const profileRoutes = require('./routes/profile');
const config = require("./config/config");
const cors = require("cors");

const app = express();
const PORT = config.serverPort;

// Middleware
app.use(express.json());
app.use(morgan("dev"))
app.use(cors());

// Routes
app.use("/auth", authRoutes);
app.use("/account", accountRoutes);
app.use("/transaction", transactionRoutes);
app.use('/bill', billRoutes);
app.use("/profile", profileRoutes);

// Welcome message for the root path
app.get("/", (req, res) => {
    res.send("Welcome to Siyabhanga online banking api!"); // You can customize this message
});

// Connect to MongoDB
mongoose.connect(config.database, { useNewUrlParser: true, useUnifiedTopology: true });
console.log("Connected to MongoDB!");

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;