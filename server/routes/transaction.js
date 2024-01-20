// Importing required modules
const express = require('express');
const transactionController = require('../controllers/transactionController');
const authMiddleware = require('../middleware/authMiddleware');

// Creating an Express Router
const router = express.Router();


/**
 * @route GET /transaction/history
 * @description View transaction history for the authenticated user.
 * @middleware authMiddleware - Ensures the request is authenticated.
 */
router.get('/history', authMiddleware, transactionController.viewTransactionHistory);

/**
 * @route POST /transaction/transfer
 * @description Transfer funds between accounts.
 * @middleware authMiddleware - Ensures the request is authenticated.
 */
router.post('/transfer', authMiddleware, transactionController.transferFunds);

/**
 * @route GET /transaction/recent
 * @description View recent transactions for the authenticated user.
 * @middleware authMiddleware - Ensures the request is authenticated.
 */
router.get('/recent', authMiddleware, transactionController.viewRecentTransactions);

/**
 * @route GET /transaction/transaction-distribution
 * @description View transaction distribution statistics for the authenticated user.
 * @middleware authMiddleware - Ensures the request is authenticated.
 */
router.get('/transaction-distribution', authMiddleware, transactionController.viewTransactionDistribution);

/**
 * @route GET /transaction/transaction-amounts
 * @description View transaction amounts statistics for the authenticated user.
 * @middleware authMiddleware - Ensures the request is authenticated.
 */
router.get('/transaction-amounts', authMiddleware, transactionController.viewTransactionAmount);

// Export the router for use in other modules
module.exports = router;