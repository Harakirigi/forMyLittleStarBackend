// Modules
const express = require("express");
const path = require("path");
const cors = require("cors")
require('dotenv').config();

// Global variables
const app = express();
const starRoutes = require("./routes/starRoutes");
const PORT = process.env.PORT || 3005;

// App use
app.use(cors());
app.use(express.json());
app.use("/star", starRoutes);


// Default route
app.get("/", (req, res) => {
    res.send("Hello from Backend!");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});