const universityController = require("../controller/University");
const express = require('express');
const router = express.Router();

// Create University 
router.route("/university").post(universityController.createUniversity);
router.route("/degree").post(universityController.createDegree);
module.exports = router;