const express = require("express");
const router = express.Router();
const userController = require("../controller/User");
const authenticateMiddleware = require("../middleware/authenticate");

const multer = require("multer");
const upload = multer({dest: "uploads/"});

// Register
router.route("/register").post(upload.single("profile"),userController.register);
// Login
router.route("/login").post(userController.login);
// Get user info
router.route("/")
    .get(authenticateMiddleware, userController.getUserInfo)
    .patch(userController.updateUser);
// Single user route
router.route("/:userID")
    .get(userController.getSingleUser);
// Add friend
router.route("/addFriend").patch(userController.addFriend);
module.exports = router;