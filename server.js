const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./database/connectDB");
dotenv.config();
const cloudinary = require("cloudinary").v2;
const PORT = process.env.PORT || 8080;


const bodyParser = require("body-parser");

// Import Routers and Middlware
const userRouter = require("./routes/userRoutes");
const universityRouter = require("./routes/universityRoutes")
const postRouter = require("./routes/postRoute");
const courseReviewRouter = require("./routes/Course");

const app = express();

// Configuration 
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Routes
app.get("/", (req, res) => res.send("<h1>Welcome to BrainBox API<h1>"));
app.use("/user", userRouter);
app.use("/university", universityRouter);
app.use("/post", postRouter);

app.use("/courseReview",courseReviewRouter);
// Connect to Database abd start the server
const start = async() => {
    try {
        await connectDB(process.env.MONGO_DB_URL);
        app.listen(PORT, () => console.log(`Connected to DB and server is running on PORT ${PORT}`))
    } catch(error) {
        console.log(error)
    }
}
start();

