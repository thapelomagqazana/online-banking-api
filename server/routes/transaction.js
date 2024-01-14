
const express = require('express');
const transactionController = require('../controllers/transactionController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/history', authMiddleware, transactionController.viewTransactionHistory);
router.post('/transfer', authMiddleware, transactionController.transferFunds);

module.exports = router;