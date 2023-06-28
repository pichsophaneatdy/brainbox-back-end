const express = require("express");
const router = express.Router();
const ProductController = require('../controller/Product');

const multer = require("multer");
const upload = multer({dest: "uploads/"});

router.route("/").post(upload.single("image"),ProductController.createProduct)
router.route("/:degreeID").get(ProductController.getProducts);

module.exports = router;