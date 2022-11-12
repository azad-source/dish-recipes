const Recipe = require("../models/Recipe");

/** Show the list of Recipes */
const indexRecipes = (req, res, next) => {
  Recipe.find()
    .sort("-updatedAt")
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      res.json({
        message: "An error occured!",
      });
    });
};

const showRecipe = (req, res, next) => {
  let recipeID = req.body.recipeID;
  Recipe.findById(recipeID)
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      res.json({
        message: "An error occured!",
      });
    });
};

/** Add new recipe */
const storeRecipe = (req, res, next) => {
  let recipe = new Recipe({
    name: req.body.name,
    preparingTime: req.body.preparingTime,
    servingsNumber: req.body.servingsNumber,
    ingredients: req.body.ingredients,
  });

  recipe
    .save()
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      res.json({
        message: "An error occured!",
      });
    });
};

/** Update recipe by id */
const updateRecipe = (req, res, next) => {
  let recipeID = req.body.recipeID;

  let updateData = {
    name: req.body.name,
    preparingTime: req.body.preparingTime,
    servingsNumber: req.body.servingsNumber,
    ingredients: req.body.ingredients,
  };

  Recipe.findByIdAndUpdate(recipeID, { $set: updateData })
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      res.json({
        message: "An error occured!",
      });
    });
};

/** Delete recipe by id */
const removeRecipe = (req, res, next) => {
  let recipeID = req.body.recipeID;

  Recipe.findByIdAndRemove(recipeID)
    .then(() => {
      res.json(true);
    })
    .catch((error) => {
      res.json({
        message: "An error occured!",
      });
    });
};

module.exports = {
  indexRecipes,
  showRecipe,
  storeRecipe,
  updateRecipe,
  removeRecipe,
};
