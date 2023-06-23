const University = require("../model/University");
const Degree = require("../model/Degree");
const Course = require("../model/CourseModel");
const User = require("../model/UserModel");
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
const getSingleUniversity = async (req, res) => {
    if(!req.params.uniID) {
        return res.status(400).json({message: "Missing University Information"});
    }
    try {
        const university = await University.findOne({_id: req.params.uniID});
        if(!university) {
            res.status(400).json({message: "This university does not exist"});
        }
        res.status(200).json(university);
    } catch(error) {
        res.status(500).json({message: "Unable to retrieve this university right now, please try again later."})
    }
}
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
// Get a single degree
const getSingleDegree = async(req, res) => {
    if(!req.params.degreeID) {
        return res.status(400).json({message: "Missing Degree  Information"});
    }
    try {
        const degree = await Degree.findOne({_id: req.params.degreeID});
        if(!degree) {
            return res.status(400).json({message: "This degree does not exist"});
        }
        res.status(200).json(degree);
    } catch(error) {
        res.status(500).json({message: "Unable to retrieve the message right now, please try again later."})
    }
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
        res.status(500).json({message: "Unable to create this course right now, please try again later", error: error});
    }
}
const getCourses = async(req, res) => {
    if(!req.params.degreeID) {
        res.status(400).json({message: "Missing degree information"})
    }
    try {
        const allCourses = await Course.find();
        const filteredCourses = allCourses.filter((course) => course.degree == req.params.degreeID);
        res.status(200).json(filteredCourses);
    } catch(error) {
        res.status(500).json({message: "Unable to retrieve the courses right now, please try again later.", error: error})
    }

}
const getSingleCourse = async(req, res)=> {
    if(!req.params.courseID) {
        return res.status(400).json({message: "Missing course id"});
    }
    try {
        const course = await Course.findOne({_id: req.params.courseID});
        if(course.length < 1) {
            return res.status(400).json({message: "This course does not exist."})
        }
        res.status(200).json(course);
    } catch(error) {
        res.status(500).json({message: "Unable to retrieve the information right now, please try again later", error: error})
    }
}
const getUserGivenCourse = async(req, res) => {
    if(!req.params.courseID) {
        return res.status(400).json({message: "Missing course id"});
    }
    try {
        const allUsers = await User.find();
        const users = [];
        const pastUsers = [];
        allUsers.forEach((user) => {
            user?.enrollment?.current?.map((course) => {
                if(course == req.params.courseID) {
                    const {_id, firstName, lastName, university, degree} = user;
                    users.push({_id, firstName, lastName, university, degree});
                };
            })
            user?.enrollment?.past?.map((course) => {
                if(course == req.params.courseID) {
                    const {_id, firstName, lastName, university, degree} = user;
                    pastUsers.push({_id, firstName, lastName, university, degree});
                };
            })
        })
        res.status(200).json({current: users, past: pastUsers});
    } catch(error){
        console.log(error);
        res.status(500).json({message: "Unable to retrieve the information right now, please try again later", error: error})
    }
}
module.exports = {createUniversity, getUniversities, getSingleUniversity, createDegree, getDegrees, getSingleDegree, createCourse, getCourses, getSingleCourse, getUserGivenCourse};