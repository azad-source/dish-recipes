const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const IngredientSchema = new Schema({
  /** Название (например: яйцо) */
  name: String,
  /** Количество в граммах */
  weight: Number,
  /** Количество в штуках */
  quantity: Number,
  /** Чайных ложек */
  teaSpoon: Number,
  /** Столовых ложек */
  tablespoon: Number,
  /** Объем в мл */
  volume: Number,
});

const recipesSchema = new Schema({
  /** Название блюда */
  name: {
    type: String,
  },
  /** Время приготовления в минутах */
  preparingTime: {
    type: Number,
  },
  /** Количество порций */
  servingsNumber: {
    type: Number,
  },
  /** Ингредиенты */
  ingredients: {
    type: [IngredientSchema],
  },
});

const Recipe = mongoose.model("Recipe", recipesSchema);
module.exports = Recipe;
