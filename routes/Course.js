const express = require("express");
const router = express.Router();
const courseReviewController = require("../controller/CoureReview");

router.route("/").post(courseReviewController.createReview)
router.route("/:courseID").get(courseReviewController.getReview)

module.exports = router;