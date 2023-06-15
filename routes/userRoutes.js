const express = require("express");
const router = express.Router();
const userController = require("../controller/User");

// Register
router.route("/register").post(userController.register);
// Login
router.route("/login").post(userController.login);

module.exports = router;