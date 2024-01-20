// Importing required modules
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const billController = require('../controllers/billController');

/**
 * @route POST /bill/pay
 * @description Pay bills for the authenticated user.
 * @middleware authMiddleware - Ensures the request is authenticated.
 */
router.post('/pay', authMiddleware, billController.payBills);

// Export the router for use in other modules
module.exports = router;