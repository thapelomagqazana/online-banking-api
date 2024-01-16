
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const billController = require('../controllers/billController');

// Route to pay bills
router.post('/pay', authMiddleware, billController.payBills);

module.exports = router;