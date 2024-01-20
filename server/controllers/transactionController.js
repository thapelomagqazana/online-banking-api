const Transaction = require("../models/Transaction");
const User = require("../models/User");
const Account = require("../models/Account");
const mongoose = require("mongoose");


/**
 * Get the transaction history for the authenticated user.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @returns {object} JSON response with the user's transaction history or an error message.
 */
const viewTransactionHistory = async (req, res) => {
    try {
      let query = { userId: req.userId };
  
      // Include the condition for the account ID
      if (req.query.accountId) {
        query.accountId = req.query.accountId;
      }
  
      // Search transactions by description
      if (req.query.search) {
        query.description = { $regex: new RegExp(req.query.search, 'i') };
      }
  
      // Apply filters
      if (req.query.filter) {
        query.type = req.query.filter.toLowerCase();
      }
  
      // Sort transactions
      let sort = { date: 1 }; // Default sorting by date
      if (req.query.sort) {
        sort = {};
        sort[req.query.sort] = 1;
      }

      // Paginate results
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;

      // Fetch transactions based on query parameters
      const transactions = await Transaction.find(query)
        .sort(sort)
        .skip(skip)
        .limit(limit);
  
      res.status(200).json({ transactions });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

const transferFunds = async (req, res) => {
    // Updating sender's and receiver's account balances
    // Create transaction records
    try {
      const { accountNumber, amount, recipientAccountNumber } = req.body;

      const amount1 = Number(amount);

      // Find sender's account by account number
      const senderAccount = await Account.findOne({ accountNumber, userId: req.userId });

      if (!senderAccount) {
          return res.status(400).json({ message: "Sender's account not found" });
      }

      const senderUser = await User.findById(req.userId);

      if (!senderUser) {
          return res.status(400).json({ message: "Sender user not found" });
      }

      // Validate amount
      if (typeof amount1 !== "number" || amount1 <= 0) {
          return res.status(400).json({ message: "Invalid transfer amount" });
      }

      // Check if the sender has sufficient balance
      if (amount1 > senderAccount.balance) {
          return res.status(400).json({ message: "Insufficient account balance" });
      }

      // Find recipient's account by account number
      const recipientAccount = await Account.findOne({ accountNumber: recipientAccountNumber });

      if (!recipientAccount) {
          return res.status(400).json({ message: "Recipient's account not found" });
      }

      // Check if the recipient is the same as the sender
      if (recipientAccountNumber === accountNumber) {
          return res.status(400).json({ message: "Cannot transfer funds to yourself" });
      }

      // Update sender's account balance (subtracting the transferred amount)
      senderAccount.balance = Number(senderAccount.balance) - amount1;
      await senderAccount.save();

      // Update recipient's account balance (adding the transferred amount)
      recipientAccount.balance = Number(recipientAccount.balance) + amount1;
      await recipientAccount.save();

      // Create transaction records
      const senderTransaction = new Transaction({
          userId: req.userId,
          accountId: senderAccount._id,
          type: "credit",
          amount,
          description: `Transferred funds to ${recipientAccount.title}`,
      });
      await senderTransaction.save();

      const recipientTransaction = new Transaction({
          userId: recipientAccount.userId,
          accountId: recipientAccount._id,
          type: "debit",
          amount,
          description: `Received funds from ${senderUser.username}`,
      });
      await recipientTransaction.save();

      res.status(200).json({ message: "Funds transferred successfully" });

  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
  }
};

const viewRecentTransactions = async (req, res) => {
  try {
      const accountId = req.query.accountId;

      // Check if the accountId is provided
      if (!accountId) {
          return res.status(400).json({ message: 'accountId parameter is required' });
      }

      // Fetch recent transactions for the specified accountId
      const transactions = await Transaction.find({ accountId })
          .sort({ timestamp: -1 }) // Sort in descending order of timestamp
          .limit(3); // Limit to 3 most recent transactions

      res.status(200).json({ transactions });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
  }
};

// Fetch transaction distribution
const viewTransactionDistribution = async (req, res) => {
    try {
      // Extract accountId from the request query parameters
      const { accountId } = req.query;

      if (!accountId) {
        return res.status(400).json({ error: 'Missing accountId parameter' });
      }
      
      // Count the number of transactions for each type for the specified account
      const debitCount = await Transaction.countDocuments({ accountId, type: 'debit' });
      const creditCount = await Transaction.countDocuments({ accountId, type: 'credit' });
  
      res.json({ debitCount, creditCount });
    } catch (error) {
      console.error('Error fetching transaction distribution:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  // Fetch transaction amounts for visualization
  const viewTransactionAmount = async (req, res) => {
    try {
      // Fetch transaction amounts
      const transactions = await Transaction.find({}, 'amount');
  
      res.json({ transactionAmounts: transactions.map(transaction => transaction.amount) });
    } catch (error) {
      console.error('Error fetching transaction amounts:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

module.exports = { viewTransactionHistory, transferFunds, viewRecentTransactions, viewTransactionDistribution, viewTransactionAmount };