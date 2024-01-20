// Importing required modules
const express = require("express");
const { body } = require("express-validator");
const authController = require("../controllers/authController");

// Creating an Express Router
const router = express.Router();

// Validation middleware for user registration
const validateRegister = [
    body("username").trim().isLength({ min:3 }).withMessage("Username must be at least 3 characters long"),
    body("email").isEmail().withMessage('Invalid email address'),
    body("password").isLength({ min:8 }).withMessage("Password must be at least 8 characters long"),

];


/**
 * @route POST /auth/register
 * @description Register a new user.
 * @middleware validateRegister - Validates user registration data.
 */
router.post("/register", validateRegister, authController.register);

/**
 * @route POST /auth/login
 * @description Log in an existing user.
 */
router.post("/login", authController.login);

// Export the router for use in other modules
module.exports = router;