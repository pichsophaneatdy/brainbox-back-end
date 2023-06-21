const mongoose = require("mongoose");

const CourseReviewSchema = new mongoose.Schema({
    userID:{
        type: String,
        required: true
    },
    courseID: {
        type: String,
        required: true
    },
    professor: {
        type: String,
        required: true
    },
    difficulty: {
        type: Number, 
        required: true
    },
    usefulness: {
        type: Number, 
        required: true
    },
    topics: {
        type: Array,
        required: true
    },
    recommendation: {
        type: Boolean,
        required: true
    },
    comment: {
        type: String, 
        default: ""
    }
})

module.exports = mongoose.model("CourseReview", CourseReviewSchema);