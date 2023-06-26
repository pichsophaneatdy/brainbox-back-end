const mongoose = require("mongoose");
const PostSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true
    },
    content: {
        type: String, 
        required: true
    },
    like: {
        type: Number,
        default: 0
    },
    comment: {
        type: Array,
        default: []
    },
    createdAt: {
        type: Date,
    },
    image: {
        type: String,
        default: ""
    }

})

module.exports = mongoose.model("Post", PostSchema);