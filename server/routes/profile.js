const express = require("express");
const { body } = require("express-validator");
const profileController = require("../controllers/profileController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/view", authMiddleware, profileController.viewProfile);
router.put("/update", authMiddleware, profileController.updateProfile);


module.exports = router;