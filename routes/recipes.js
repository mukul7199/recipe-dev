const express = require("express");
const Recipe = require("../models/Recipe");
const middleware = require("../middleware");

const router = express.Router();

router.get("/", (req, res) => {
  Recipe.find({}).then(recipes => {
    res.send({ recipes });
  });
});

router.get("/me", middleware.authenticate, (req, res) => {
  Recipe.find({ createdBy: req.user._id }).then(recipes => {
    res.send({ recipes });
  });
});

router.post("/", (req, res) => {
  const { title, image } = req.body;
  const ingredients = req.body.ingredients + "";
  const steps = req.body.steps + "";

  //  Split the ingredients at comma
  const ia = ingredients.split(",");
  const newIngredients = ia.map(item => item.trim());
  //  Split the steps at new line
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

router.delete("/me/:id", middleware.authenticate, (req, res) => {
  Recipe.findOneAndDelete({ _id: req.params.id }).then(recipe => {
    res.send(recipe);
  });
});

router.patch("/me/:id", (req, res) => {
  const { title, ingredients, steps, image } = req.body;
  const body = { title, ingredients, steps, image };
  Recipe.findOneAndUpdate(
    { _id: req.params.id },
    { $set: body },
    { new: true }
  ).then(recipe => {
    res.send(recipe);
  });
});

module.exports = router;
