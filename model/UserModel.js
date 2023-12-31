const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require: true,
        min: 3
    },
    lastName: {
        type: String,
        require: true,
        min: 3
    },
    email: {
        type: String,
        require: true,
        unique: true,
        index: true
    },
    friends: {
        type: Array,
        default: []
    },
    password: {
        type: String,
        require: true
    },
    picturePath: {
        type: String,
        default: ""
    },
    university: {
        type: String,
        default: ""
    },
    degree: {
        type: String,
        default: ""
    },
    occupation: {
        type: String,
        default: "Student"
    },
    location: {
        type: "String",
        require: true
    },
    enrollment: {
        type: Object,
        default: {}
    }
})

module.exports = mongoose.model("User", UserSchema);