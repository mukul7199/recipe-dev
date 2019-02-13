const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb://mukul8299:mukul123@ds231501.mlab.com:31501/recipe-dev";

// Load routes
const recipesRoute = require("./routes/recipes");

// Middleware
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send({ message: "Works" });
});

// Use routes
app.use("/recipes", recipesRoute);

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

app.listen(PORT, () => {
  console.log(`Server is up on port ${PORT}`);
});
