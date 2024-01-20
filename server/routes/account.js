// Importing required modules
const express = require("express");
const { body } = require("express-validator");
const accountController = require("../controllers/accountController");
const authMiddleware = require("../middleware/authMiddleware");

// Creating an Express Router
const router = express.Router();

/**
 * @route POST /account/create
 * @description Create a new account for the authenticated user.
 * @middleware authMiddleware - Ensures the request is authenticated.
 */
router.post("/create", authMiddleware, accountController.createAccount);

/**
 * @route GET /account/accounts
 * @description Get a list of accounts for the authenticated user.
 * @middleware authMiddleware - Ensures the request is authenticated.
 */
router.get("/accounts", authMiddleware, accountController.getAccounts);

/**
 * @route GET /account/balance
 * @description Get the balance of the active account for the authenticated user.
 * @middleware authMiddleware - Ensures the request is authenticated.
 */
router.get("/balance", authMiddleware, accountController.getAccountBalance);

/**
 * @route GET /account/active
 * @description Get the details of the active account for the authenticated user.
 * @middleware authMiddleware - Ensures the request is authenticated.
 */
router.get("/active", authMiddleware, accountController.getActiveAccount);

/**
 * @route POST /account/set-active/:accountId
 * @description Set the specified account as the active account for the authenticated user.
 * @param {string} accountId - The ID of the account to set as active.
 * @middleware authMiddleware - Ensures the request is authenticated.
 */
router.post("/set-active/:accountId", authMiddleware, accountController.setActiveAccount);

// Export the router for use in other modules
module.exports = router;