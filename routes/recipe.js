const express = require("express");
const router = express.Router();

const RecipeController = require("../controllers/RecipeController");

router.get("/", RecipeController.indexRecipes);
router.post("/show", RecipeController.showRecipe);
router.post("/store", RecipeController.storeRecipe);
router.post("/update", RecipeController.updateRecipe);
router.post("/remove", RecipeController.removeRecipe);

module.exports = router;
