const Account = require('../models/Account');
const User = require('../models/User');
const mongoose = require('mongoose');


const createAccount = async (req, res) => {
  try {
    const { accountNumber, title } = req.body;
    const userId = req.userId; // Assuming the userId is available in the request (e.g., from authentication middleware)

    // Check if the user exists
    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the accountNumber already exists
    const existingAccount = await Account.findOne({ accountNumber });

    if (existingAccount) {
      return res.status(400).json({ message: 'Account with this accountNumber already exists' });
    }

    // Create a new account
    const newAccount = new Account({
      userId,
      accountNumber,
      title,
    });

    // Save the new account to the database
    await newAccount.save();

    res.status(201).json({ message: 'Account created successfully' });
  } catch (error) {
    console.error('Error creating user account:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


const getAccountBalance = async (req, res) => {
  try {
    const accountId = req.query.accountId; // Fetch accountId from query parameters

    // Check if the account exists
    const account = await Account.findById(accountId);
    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }

    res.json({ balance: account.balance });
  } catch (error) {
    console.error('Error retrieving account balance:', error);
    res.status(500).json({ message: 'Internal server error' });
  }

};

const getActiveAccount = async (req, res) => {
  try {
    // Assuming req.userId is set by your authentication middleware
    const userId = req.userId;

    // Find the active account for the user
    const activeAccount = await Account.findOne({ userId, isActive: true });

    if (!activeAccount) {
      return res.status(404).json({ message: 'Active account not found' });
    }

    // Respond with the details of the active account
    res.status(200).json({
      activeAccount
      // Include other details as needed
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const setActiveAccount = async (req, res) => {
  const accountId = req.params.accountId;

  try {
    // Find the account with the given accountId
    const account = await Account.findById(accountId);

    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }

    // Set the isActive field to true for the selected account
    account.isActive = true;
    await account.save();

    // Optionally, you might want to set isActive to false for other accounts

    // set isActive to false for other accounts
    await Account.updateMany({ _id: { $ne: accountId } }, { $set: { isActive: false } });

    res.status(200).json({ message: 'Active account set successfully' });
  } catch (error) {
    console.error('Error setting active account:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getAccounts = async (req, res) => {
  try {
    // Fetch user accounts based on the userId
    const userId = req.userId; // Assuming the userId is available in the request (e.g., from authentication middleware)
    const accounts = await Account.find({ userId });

    res.json({ accounts });
  } catch (error) {
    console.error('Error retrieving user accounts:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


module.exports = { getAccountBalance, getAccounts, createAccount, getActiveAccount, setActiveAccount };