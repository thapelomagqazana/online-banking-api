const express = require("express");
const { body } = require("express-validator");
const accountController = require("../controllers/accountController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/profile", authMiddleware, accountController.viewProfile);
router.put("/profile", authMiddleware, accountController.updateProfile);
router.get("/balance", authMiddleware, accountController.getAccountBalance);

module.exports = router;