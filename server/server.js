const express = require("express");
const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
const morgan = require("morgan");
const authRoutes = require("./routes/auth");
const accountRoutes = require("./routes/account");
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

// Connect to MongoDB
mongoose.connect(config.database, { useNewUrlParser: true, useUnifiedTopology: true });
console.log("Connected to MongoDB!");

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;