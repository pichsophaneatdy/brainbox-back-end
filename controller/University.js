const University = require("../model/University");
const Degree = require("../model/Degree");
const Course = require("../model/CourseModel");
//  Create university 
const createUniversity = async(req, res) => {
    const {name, location, website} = req.body;
    if (!name || !location) {
        return res.status(400).json({message: "Missing name or location of the university"});
    }
    try {
        const newUniversity = await University.create({name, location, website});
        res.status(201).json(newUniversity);
    } catch(error) {
        res.status(400).json({message: "Unable to create a new university right now, please try again later"});
    }
    
}
// Get All University 
const getUniversities = async (req, res) => {
    try {
        const universities = await University.find();
        res.status(200).json(universities);
    } catch(error) {
        res.status(500).json({message: "Unable to retrieve universities' information righ now"});
    }
}
// Get Single University

// createDegree
const createDegree = async(req,res) => {
    const {name, credits, university, description} = req.body;
    if (!name || !credits || !university) {
        return res.status(400).json({message: "Missing information"})
    }
    try {
        const newDegree = await Degree.create({name, description, credits, university});
        res.status(201).json(newDegree);
    } catch(error) {
        console.log(error)
        res.status(500).json({message: "Unable to create this degree right now, please try again later"});
    }
}
const getDegrees = async(req,res) => {
    if(!req.params.universityID){
        return res.status(400).json({message: "Missing University Information"});
    }
    const degrees = await Degree.find();
    const filteredDegrees = degrees.filter((degree) => degree.university == req.params.universityID);
    res.status(200).json(filteredDegrees);
}
// Add course 
const createCourse = async(req, res) => {
    const {name, code, credits,degree, description} = req.body;
    if (!name || !code || !credits || !degree) {
        return res.status(400).json({message: "Missing required fields"})
    }
    try {
        const newCourse = await Course.create({name, code, credits, degree, description});
        res.status(201).json(newCourse);
    } catch(error){
        res.status(500).json({message: "Unable to create this course right now, please try again later"});
    }
}

module.exports = {createUniversity, getUniversities, createDegree, getDegrees, createCourse};