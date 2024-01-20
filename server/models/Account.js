const mongoose = require("mongoose");

// Define a Mongoose schema for the Account model
const accountSchema = new mongoose.Schema({
    // User ID associated with the account
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

    // Account number (should be unique)
    accountNumber: { type: String, required: true, unique: true },

    // Current balance of the account
    balance: { type: Number, default: 20000 },

    // Title or name of the account
    title: { type: String, required: true },

    // Flag indicating whether the account is active
    isActive: {
        type: Boolean,
        default: false, // Set the default value as needed
      },
});

// Create a Mongoose model named "Account" based on the accountSchema
const Account = mongoose.model('Account', accountSchema);

// Export the Account model for use in other modules
module.exports = Account;