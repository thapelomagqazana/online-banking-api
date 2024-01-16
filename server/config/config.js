require('dotenv').config();

module.exports = {
  // Database configuration
  database: process.env.DATABASE_URL,

  // Secret key for JWT (JSON Web Tokens) authentication
  jwtSecret: process.env.JWT_SECRET,

  // Port for the server to listen on
  serverPort: process.env.PORT || 5000,
};