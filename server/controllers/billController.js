const Transaction = require('../models/Transaction');
const User =   require("../models/User");
const Account = require("../models/Account");

const payBills = async (req, res) => {
  // Deduct the bill amount from the user's account balance
  // Create a transaction record
  try {
    const { accountNumber, billAmount, billDescription } = req.body;

    // Deduct the bill amount from the user's account balance
    const senderAccount = await Account.findOne({ accountNumber, userId: req.userId });


    const amount = Number(billAmount);


    if ( typeof amount !== "number" )
    {
        return res.status(400).json({ message: "Number does not exist" });
    }

    if ( amount > senderAccount.balance )
    {
        return res.status(400).json({ message: "Sender's account balance is insufficient" });
    }

    if ((typeof billDescription === "string" && billDescription.trim().length === 0) || billDescription === null )
    {
        return res.status(400).json({ message: "Bill Description does not exist" });
    }


    senderAccount.balance = Number(senderAccount.balance) - billAmount;
    await senderAccount.save();

    // Create a transaction record for the bill payment
    const billTransaction = new Transaction({
      userId: req.userId,
      accountId: senderAccount._id,
      type: 'credit',
      amount: billAmount,
      description: billDescription,
    });
    await billTransaction.save();

    res.status(200).json({ message: 'Bill payment successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  payBills,
};