const mongoose = require("mongoose");

const DegreeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ""
    },
    credits: {
        type: Number,
        required: true
    },
    university: {
        type: String,
        required: true
    }
})
module.exports = mongoose.model("Degree", DegreeSchema);