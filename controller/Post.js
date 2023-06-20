const Post = require("../model/Post");

// Create Post
const createPost = async(req, res) => {
    const {content , userID} = req.body;
    if (!content || !userID) {
        return res.status(400).json({message: "Missing required information"});
    }
    try {
        const newPost = await Post.create({
            userID,
            content, 
            createAt: new Date()
        });
        res.status(201).json(newPost);
    } catch(error) {
        console.log(error);
        res.status(500).json({message: "Unable to create the post right now, please try again later"});
    }
}
const getPost = async(req, res) => {
    if(!req.params.userID) {
        return res.status(400).json({message: "Missing user information"});
    }
    try{
        const foundPosts = await Post.find({userID: req.params.userID});
        res.status(200).json(foundPosts);
    } catch(error) {
        res.status(500).json({message: "Unable to retrieve the post currently, please try again later"});
    }
}
module.exports = {createPost, getPost};