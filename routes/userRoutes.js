const express = require("express");
const router = express.Router();
const userController = require("../controller/User");
const authenticateMiddleware = require("../middleware/authenticate");
// Register
router.route("/register").post(userController.register);
// Login
router.route("/login").post(userController.login);
// Get user info
router.route("/").get(authenticateMiddleware, userController.getUserInfo);
module.exports = router;