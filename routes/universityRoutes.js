const universityController = require("../controller/University");
const express = require('express');
const router = express.Router();

// Create University 
router.route("/university").post(universityController.createUniversity).get(universityController.getUniversities);
router.route("/degree").post(universityController.createDegree)
router.route("/degree/:universityID").get(universityController.getDegrees);;
router.route("/course").post(universityController.createCourse);
router.route("/course/:degreeID").get(universityController.getCourses);
router.route("/singleCourse/:courseID").get(universityController.getSingleCourse)
module.exports = router;