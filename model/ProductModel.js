const mongoose = require("mongoose");

const ProduceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    degreeID: {
        type: String,
        required: true
    },
    userID: {
        type: String,
        required: true
    },
    image: {
        type: String, 
        required: true
    },
    detail: {
        type: String,
        default: ""
    }
})

module.exports = mongoose.model("Product", ProduceSchema);