const User = require("../model/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")
// Streamchat
const {connect} = require("getstream");
const StreamChat = require("stream-chat").StreamChat;

// Cloudinary
const cloudinary = require('cloudinary').v2;
// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const api_key = process.env.STREAM_API_KEY;
const api_secret = process.env.STREAM_API_SECRET;
const app_id = process.env.STREAM_APP_ID;

// Register a new student
const register = async (req, res) => {
    // Check if all the required fields exist
    const {firstName, lastName, email, password, location} = req.body;
    if (!firstName || !lastName || !email || !password || !location) {
        return res.status(400).json({message: "Missing requires information"});
    }
    // Check if the user already exists
    const duplicateUser = await User.find({email});
    if (duplicateUser.length > 0) {
        return res.status(400).json({message: "User already exists. Please login."});
    }
    // hash password
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    // Create a new user to the database
    try {
        const result = await cloudinary.uploader.upload(req.file.path);
        const newUser = await User.create({firstName, lastName, email, password: hashPassword, location, picturePath: result.url});
        const accessToken = await jwt.sign({id: newUser._id, firstName: newUser.firstName}, process.env.SECRET_KEY, {expiresIn: "24h"});
        // Stream chart
        const serverClient = connect(api_key, api_secret, app_id);
        const streamChatToken = serverClient.createUserToken((newUser._id).toString());

        res.status(201).json({accessToken, streamChatToken});
    } catch(error) {
        console.log(error);
        res.status(500).send({server_error: error});
    }
}
// Login
const login = async (req, res) => {
    // Check if the email and the password exists in the request body
    const {email, password} = req.body;
    if (!email || !password) {
        return res.status(400).json({message: "Missing email or password fields"})
    }
    // Check if the user exists
    const foundUser = await User.findOne({email});
    if (!foundUser) {
        return res.status(400).json({message: "User with this email address does not exist. Sign up for an account"})
    }
    // Compare password
    const validPassword = bcrypt.compareSync(password, foundUser.password);
    if(!validPassword) {
        return res.status(401).json({message: "The password is incorrect."})
    }
    // Stream chat
    const serverClient = connect(api_key, api_secret, app_id);
    const client = StreamChat.getInstance(api_key, api_secret);
    const streamChatToken = serverClient.createUserToken((foundUser._id).toString())
    const accessToken = jwt.sign({id: foundUser._id, firstName: foundUser.firstName}, process.env.SECRET_KEY, {expiresIn: "24h"});
    res.status(200).json({accessToken, streamChatToken});
}
// Update User Info 
const updateUser = async(req, res) => {
    const {userID, university, degree, enrollment} = req.body;
    if (!userID || !university || !degree || !enrollment) {
        return res.status(400).json({message: "Missing required information"});
    }
    try {
        const updatedUser = await User.findByIdAndUpdate({_id: userID}, {university: university, degree: degree, enrollment: enrollment});
        const updatedInfo = await User.findById(userID).select('-password');
        res.status(200).json(updatedInfo);
    } catch(error) {
        res.status(500).json({message: 'Unable to update the user right now, please try again later'});
    }
    
}

// Get User Info
const getUserInfo = async (req, res) => {
    if (!req.user || !req.user.id) {
        return res.status(403).json({message: "Not authorized"});
    }
    const {id, firstName} = req.user;
    // Find User 
    const foundUser = await User.findOne({_id: id}).select('-password');
    if (!foundUser) {
        return res.status(400).json({message: "User does not exist"})
    }
    res.status(200).json(foundUser);
}
// Get Single User Info
const getSingleUser = async (req, res) => {
    if(!req.params.userID) {
        return res.status(400).message({message: "Missing user id"})
    }
    try {
        const foundUser = await User.findOne({_id: req.params.userID});
        if(!foundUser) return res.status(400).json({message: "User with this ID does not exist."});
        const {_id, firstName, lastName, location, friends} = foundUser;
        res.status(200).json({_id, firstName, lastName, location, friends});
    } catch(error){
        res.status(500).json({message: "Unable to retrieve the user currently, please try again later"})
    }
}
// Add user to friend list
const addFriend = async (req, res) => {
    const {userID, friendID} = req.body;
    if (!userID || !friendID) {
        return res.status(400).json({message: "Missing user or friend information"});
    }
    try {
        const foundUser = await User.findById(userID);
        const foundFriend = await User.findById(friendID);
        if (!foundUser || !foundFriend) {
            return res.status(400).json({message: "User not found or friend not found"});
        }
        // Update user's friend list
        const updatedUser = await User.findOneAndUpdate({_id: userID}, {friends: [...foundUser.friends, foundFriend]} );
        // Update friend's friend list
        const updatedFriend = await User.findOneAndUpdate({_id: friendID}, {friends: [...foundFriend.friends, foundUser]});
        // Success
        res.status(200).json({message: "Success"});
    } catch(error) {
        console.log(error)

        res.status(401).json({message: "Unable to add to this user's friend list right now, please try again later"})
    }
}
module.exports = {register, login, getUserInfo, updateUser, getSingleUser, addFriend}