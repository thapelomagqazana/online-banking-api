const express = require("express");
const { body } = require("express-validator");
const authController = require("../controllers/authController");

const router = express.Router();

// Validation middleware
const validateRegister = [
    body("username").trim().isLength({ min:3 }).withMessage("Username must be at least 3 characters long"),
    body("password").isLength({ min:6 }).withMessage("Password must be at least 6 characters long"),
];

router.post("/register", validateRegister, authController.register);
router.post("/login", authController.login);

module.exports = router;