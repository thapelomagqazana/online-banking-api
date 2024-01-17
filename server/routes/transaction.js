
const express = require('express');
const transactionController = require('../controllers/transactionController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/history', authMiddleware, transactionController.viewTransactionHistory);
router.post('/transfer', authMiddleware, transactionController.transferFunds);
router.get('/recent', authMiddleware, transactionController.viewRecentTransactions);
router.get('/transaction-distribution', authMiddleware, transactionController.viewTransactionDistribution);
router.get('/transaction-amounts', authMiddleware, transactionController.viewTransactionAmount);

module.exports = router;