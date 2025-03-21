// Modules
const express = require("express");
const path = require("path");
const cors = require("cors")
const bodyParser = require("body-parser");
require('dotenv').config();

// Global variables
const app = express();
const PORT = process.env.PORT || 3000;
const starRoutes = require("./routes/starRoutes");

// App use
app.use(cors())
app.use(express.json());
app.use(express.static(path.join(__dirname, "dist")));
app.use("/star", starRoutes);


// Production
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "FRONTEND/build")));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "FRONTEND", "build", "index.html"));
    });
}


// Requests
app.get("/", (req, res) => {
  res.send("Hello from Backend!");
});


app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../FRONTEND", "index.html"));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;