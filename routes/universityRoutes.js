const universityController = require("../controller/University");
const express = require('express');
const router = express.Router();

// Create University 
router.route("/university").post(universityController.createUniversity).get(universityController.getUniversities);
router.route("/singleUniversity/:uniID").get(universityController.getSingleUniversity);
router.route("/degree").post(universityController.createDegree)
router.route("/degree/:universityID").get(universityController.getDegrees);
router.route("/singleDegree/:degreeID").get(universityController.getSingleDegree);
router.route("/course").post(universityController.createCourse);
router.route("/course/:degreeID").get(universityController.getCourses);
router.route("/singleCourse/:courseID").get(universityController.getSingleCourse)
// Get user for a given course
router.route("/usersGivenCourse/:courseID").get(universityController.getUserGivenCourse);
module.exports = router;