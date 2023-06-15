const User = require("../model/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")
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
        return res.status(409).json({message: "User already exists"});
    }
    // hash password
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    // Create a new user to the database
    try {
        const newUser = await User.create({firstName, lastName, email, password: hashPassword, location});
        const accessToken = await jwt.sign({id: newUser._id, firstName: newUser.firstName}, process.env.SECRET_KEY, {expiresIn: "24h"});
        res.status(201).json({accessToken});
    } catch(error) {
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
    const accessToken = jwt.sign({id: foundUser._id, firstName: foundUser.firstName}, process.env.SECRET_KEY, {expiresIn: "24h"});
    res.status(200).json({accessToken});
}
module.exports = {register, login}