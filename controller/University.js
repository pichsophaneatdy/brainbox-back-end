const University = require("../model/University");
const Degree = require("../model/Degree");
//  Create university 
const createUniversity = async(req, res) => {
    const {name, location} = req.body;
    if (!name || !location) {
        return res.status(400).json({message: "Missing name or location of the university"});
    }
    try {
        const newUniversity = await University.create({name, location});
        res.status(201).json({university: newUniversity});
    } catch(error) {
        res.status(400).json({message: "Unable to create a new university right now, please try again later"});
    }
    
}
// createDegree
const createDegree = async(req,res) => {
    const {name, credits, university} = req.body;
    if (!name || !credits || !university) {
        return res.status(400).json({message: "Missing information"})
    }
    try {
        const newDegree = await Degree.create({name, credits, university});
        res.status(201).json({degree: newDegree});
    } catch(error) {
        res.status(500).json({message: "Unable to create this degree right now, please try again later"});
    }
    

}
// Add degree id to university's degree array list

module.exports = {createUniversity, createDegree};