const Product = require("../model/ProductModel");

// Cloudinary
const cloudinary = require('cloudinary').v2;
// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const createProduct = async (req, res) => {
    const {name, price, userID, detail, degreeID} = req.body;
    if (!name || !price || !userID || !degreeID) {
        return res.status(400).json({message: "Missing required information"});
    } 
    try {
        const result = await cloudinary.uploader.upload(req.file.path)
        const newProduct = await Product.create({
            name,
            price, 
            userID,
            detail, 
            degreeID,
            image: result.url
        });
        res.status(201).json({message: "Successfully create the product"});
    } catch(error) {
        res.status(500).json({message: "Unable to create this product right now"});
    }
}
const getProducts = async (req, res) => {
    if(!req.params.degreeID) {
        return res.status(400).json({message: "Missing information"})
    }
    try {
            const products = await Product.find({degreeID: req.params.degreeID});
            res.status(200).json(products);
    } catch(error) {
        console.log(error);
        res.status(500).json({message: "Unable to retrieve products right now"});
    }
}

module.exports = {createProduct, getProducts};