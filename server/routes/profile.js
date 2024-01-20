// Importing required modules
const express = require("express");
const { body } = require("express-validator");
const profileController = require("../controllers/profileController");
const authMiddleware = require("../middleware/authMiddleware");

// Creating an Express Router
const router = express.Router();

/**
 * @route GET /profile/view
 * @description View the profile of the authenticated user.
 * @middleware authMiddleware - Ensures the request is authenticated.
 */
router.get("/view", authMiddleware, profileController.viewProfile);

/**
 * @route PUT /profile/update
 * @description Update the profile of the authenticated user.
 * @middleware authMiddleware - Ensures the request is authenticated.
 */
router.put("/update", authMiddleware, 
[
    // Express-validator middleware for request body validation
    body("username").trim().notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Invalid email address"),
    body("password").isLength({ min:8 }).withMessage("Password must be at least 8 characters long"),
], profileController.updateProfile);

// Export the router for use in other modules
module.exports = router;