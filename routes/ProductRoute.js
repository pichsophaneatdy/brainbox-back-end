const express = require("express");
const router = express.Router();
const PostController = require('../controller/Post');

router.route("/").post(PostController.createProduct).get(PostController.getProducts);

module.exports = router;