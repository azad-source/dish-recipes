const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const dbInfo = require("./access.ts");

const RecipeRoute = require("./routes/recipe");

const isDev = false;

const dbName = "dish-recipes";

const mongoUrl = isDev
  ? `mongodb://localhost:27017/${dbName}`
  : `mongodb://azad-source.online:27017/${dbName}`; // 83.136.233.139:27017

const { user, pass } = dbInfo;

mongoose
  .connect(mongoUrl, {
    user,
    pass,
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
