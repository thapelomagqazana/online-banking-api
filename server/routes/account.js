const express = require("express");
const { body } = require("express-validator");
const accountController = require("../controllers/accountController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create", authMiddleware, accountController.createAccount);
router.get("/accounts", authMiddleware, accountController.getAccounts);
router.get("/balance", authMiddleware, accountController.getAccountBalance);
router.get("/active", authMiddleware, accountController.getActiveAccount);
router.post("/set-active/:accountId", authMiddleware, accountController.setActiveAccount);

module.exports = router;