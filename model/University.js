const mongoose = require("mongoose");

const UniversitySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            min: 3
        },
        location: {
            type: String,
            min: 3,
        },
        website: {
            type: String,
            default: ""
        },
        degree: {
            type: Array,
            default: []
        }
    }
)

module.exports = mongoose.model("University", UniversitySchema);