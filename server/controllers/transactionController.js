const Transaction = require("../models/Transaction");


/**
 * Get the transaction history for the authenticated user.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @returns {object} JSON response with the user's transaction history or an error message.
 */
const viewTransactionHistory = async (req, res) => {
    try
    {
        const transactions = await Transaction.find({ userId: req.userId });

        res.status(200).json({ transactions });
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { viewTransactionHistory };