const express = require("express");
const router = express.Router();
const postController = require("../controller/Post");

router.route("/").post(postController.createPost);
router.route("/:userID").get(postController.getPost);
module.exports = router;