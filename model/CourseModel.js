const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    credits: {
        type: Number,
        required: true
    },
    degree: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ""
    }
})

module.exports = mongoose.model("Course", CourseSchema);