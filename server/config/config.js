module.exports = {
    // Database configuration
    database: 'mongodb://localhost:27017/online-banking',
    
    // Secret key for JWT (JSON Web Tokens) authentication
    jwtSecret: 'your_jwt_secret_key',
  
    // Other configuration settings
    // ...
  
    // Port for the server to listen on
    serverPort: process.env.PORT || 5000,
  };