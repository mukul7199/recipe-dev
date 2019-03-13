const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb://mukul8299:mukul123@ds231501.mlab.com:31501/recipe-dev";

// Load routes
const recipesRoute = require("./routes/recipes");
const usersRoute = require("./routes/users");

// Middleware
app.use(bodyParser.json());

// Add headers
app.use(function(req, res, next) {
  var allowedOrigins = [
    "http://localhost:3000",
    "https://localhost:8020",
    "http://recipe1234.herokuapp.com",
    "https://recipe1234.herokuapp.com"
  ];
  var origin = req.headers.origin;
  if (allowedOrigins.indexOf(origin) > -1) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  //res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:8020');
  res.header("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, authorization");
  res.header("Access-Control-Allow-Credentials", true);
  return next();
});

app.get("/", (req, res) => {
  res.send({ message: "Works" });
});

// Use routes
app.use("/recipes", recipesRoute);
app.use("/users", usersRoute);

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

app.listen(PORT, () => {
  console.log(`Server is up on port ${PORT}`);
});
