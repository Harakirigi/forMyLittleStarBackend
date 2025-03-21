// Modules
const express = require("express");
const path = require("path");
const cors = require("cors")
const bodyParser = require("body-parser");
require('dotenv').config();

// Global variables
const app = express();
const PORT = process.env.PORT || 3000;
const starRoutes = require("../routes/starRoutes");

// App use
app.use(cors());
app.use(express.json());
app.use("/star", starRoutes);


// Production
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "FRONTEND/build")));
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "FRONTEND", "build", "index.html"));
    });
  }
  
// Default route
app.get("/", (req, res) => {
    res.send("Hello from Backend!");
});

module.exports = (req, res) => app(req, res);