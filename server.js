const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");

const RecipeRoute = require("./routes/recipe");

const isDev = true;

const mongoUrl = isDev
  ? "mongodb://localhost:27017/dish-recipes"
  : "mongodb://83.136.233.139:27017/dish-recipes";

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connection Established!");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use("/api/recipe", RecipeRoute);

