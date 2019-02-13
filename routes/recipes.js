const express = require("express");
const Recipe = require("../models/Recipe");

const router = express.Router();

router.get("/", (req, res) => {
  Recipe.find({}).then(recipes => {
    res.send({ recipes });
  });
});

router.post("/", (req, res) => {
  const { title, image } = req.body;
  const ingredients = req.body.ingredients + "";
  const steps = req.body.steps + "";

  const ia = ingredients.split(",");
  const newIngredients = ia.map(item => item.trim());

  const sa = steps.split("\n");
  const newSteps = sa.map(item => item.trim());

  const newRecipe = new Recipe({
    title,
    ingredients: newIngredients,
    steps: newSteps,
    image
  });

  newRecipe.save().then(recipe => res.send({ recipe }));
});

module.exports = router;
