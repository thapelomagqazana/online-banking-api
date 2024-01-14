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

const transferFunds = async (req, res) => {
    try
    {
        const { senderAccountId, receiverAccountId, amount } = req.body;

        const senderTransaction = new Transaction({
            accountId: senderAccountId,
            amount: -amount,
            description: "Funds Transfer to " + receiverAccountId,
        });

        const receiverTransaction = new Transaction({
            accountId: receiverAccountId,
            amount,
            description: "Funds Transfers from " + senderAccountId,
        });

        await Promise.all([senderTransaction.save(), receiverTransaction.save()]);

        res.status(200).json({ message: "Funds transferred successfully" });
    }
    catch (error)
    {
       console.error(error);
       res.status(500).json({ message: "Internal server error" }); 
    }
};

module.exports = { viewTransactionHistory, transferFunds };