const Transaction = require("../models/Transaction");
const User = require("../models/User");


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
    // Updating sender's and receiver's account balances
    // Create transaction records
    try
    {
        const { amount, recipientUsername } = req.body;

        const recipient = await User.findOne({ recipientUsername });

        if (!recipient)
        {
            return res.status(400).json({ message: "Recipient does not exist" });
        }

        const sender = await User.find( req.userId );

        if ( typeof amount !== "number" )
        {
            return res.status(400).json({ message: "Number does not exist" });
        }

        if ( amount > sender.accountBalance )
        {
            return res.status(400).json({ message: "Sender's account balance is insufficient" });
        }

        // Update sender's account balance (subtracting the transferred amount)
        sender.accountBalance -= amount;
        await sender.save();

        // Update recipient's account balance (adding the transferred amount)
        recipient.accountBalance += amount;
        await recipient.save();

        // Create transaction records
        const senderTransaction = new Transaction({
            userId: req.userId,
            type: "debit",
            amount,
            description: `Transferred funds to ${recipientUsername}`,
        });
        await senderTransaction.save();

        const recipientTransaction = new Transaction({
            userId: recipient._id,
            type: "credit",
            amount,
            description: `Received funds from ${sender.username}`,
        });
        await recipientTransaction.save();

        res.status(200).json({ message: "Funds transferred successfully" });

    }
    catch (error)
    {
       console.error(error);
       res.status(500).json({ message: "Internal server error" }); 
    }
};

module.exports = { viewTransactionHistory, transferFunds };