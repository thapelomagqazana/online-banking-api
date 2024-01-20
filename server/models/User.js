const mongoose = require("mongoose");

// Define a Mongoose schema for the User model
const userSchema = new mongoose.Schema({
    // Username field with constraints
    username: { type: String, unique: true, required: true },

    // Email field with constraints
    email: { type: String, unique: true, required: true},

    // Password field
    password: { type: String, required: true },

    // Profile image field with default value
    profileImage: {
        type: String,
        default: 'default-profile-image.jpg',
    }
    // accountBalance: { type: Number, default: 20000 },
});

// Create a Mongoose model named "User" based on the userSchema
const User = mongoose.model("User", userSchema);

// Export the User model for use in other modules
module.exports = User;