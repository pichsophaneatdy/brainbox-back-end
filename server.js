const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./database/connectDB");
dotenv.config();
const PORT = process.env.PORT || 8080;
// Import Routers
const userRouter = require("./routes/userRoutes");

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.get("/", (req, res) => res.send("<h1>Welcome to BrainBox API<h1>"));
app.use("/user", userRouter);

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