// Modules
const express = require("express");
const cors = require("cors")
require('dotenv').config();

// Global variables
const app = express();
const starRoutes = require("./routes/starRoutes");
const PORT = process.env.PORT;

// App use
app.use(cors());
app.use(express.json());
app.use("/star", starRoutes);


// Default route
app.get("/", (req, res) => {
    res.send("forMyLittleStar Server successfully running! Go to /star path for stars information");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});