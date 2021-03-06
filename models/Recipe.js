const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  ingredients: [
    {
      type: String,
      required: true,
      trim: true
    }
  ],
  steps: [
    {
      type: String,
      required: true,
      trim: true
    }
  ],
  image: {
    type: String,
    trim: true
  },
  createdBy: {
    trim: true,
    type: mongoose.Types.ObjectId
  }
});

module.exports = mongoose.model("recipe", recipeSchema);
