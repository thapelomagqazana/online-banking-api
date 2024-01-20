const mongoose = require("mongoose");

// Define a Mongoose schema for the Transaction model
const transactionSchema = new mongoose.Schema({
     // User ID associated with the transaction
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    // Account ID associated with the transaction
    accountId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: true,
    },

    // Type of transaction (debit or credit)
    type: {
        type: String,
        enum: ["debit", "credit"],
        required: true,
    },

    // Amount of the transaction
    amount: {
        type: Number,
        required: true,
    },

    // Description of the transaction
    description: {
        type: String,
        required: true,
    },

    // Timestamp of the transaction (defaults to the current date and time)
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

// Create a Mongoose model named "Transaction" based on the transactionSchema
const Transaction = mongoose.model('Transaction', transactionSchema);

// Export the Transaction model for use in other modules
module.exports = Transaction;