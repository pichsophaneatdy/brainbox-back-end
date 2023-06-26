const express = require("express");
const router = express.Router();
const postController = require("../controller/Post");

const multer = require("multer");
const upload = multer({ dest: 'uploads/'});

router.route("/").post(upload.single('image'),postController.createPost);
router.route("/:userID").get(postController.getPost);
module.exports = router;