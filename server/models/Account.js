const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    accountNumber: { type: String, required: true, unique: true },
    balance: { type: Number, default: 20000 },
    title: { type: String, required: true }, 
    isActive: {
        type: Boolean,
        default: false, // Set the default value as needed
      },
});

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;