const CourseReview = require("../model/CourseReview.js");

const createReview = async (req, res) => {
    const {userID, courseID, professor, difficulty, usefulness, topics, comment, recommendation} = req.body;
    if (!userID || !courseID || !professor || !difficulty || !usefulness || !topics || !recommendation) {
        return res.status(400).json({message: "Missing required information"});
    }
    try {
        const newReview = await CourseReview.create({
            userID, courseID, professor, difficulty, usefulness, topics, comment
        })
        res.status(201).json(newReview);
    } catch(error) {
        console.log(error);
        res.status(500).json({message: "Unable to create the course review right now, please try again later"});
    }
}

const getReview = async (req, res) => {
    if (!req.params.courseID) {
        return res.status(400).json({message: "Missing course id"});
    }
    try {
        const reviews = await CourseReview.find({courseID: req.params.courseID});
        return res.status(200).json(reviews);    
    } catch(error) {
        res.status(500).json({message: "Unable to get the course reviews right now, please try again later"});
        console.log(error);
    }
}
module.exports = {createReview, getReview}