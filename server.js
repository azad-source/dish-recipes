const fs = require("fs");
const http = require("http");
const https = require("https");
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const dbInfo = require("./access.ts");

const domain = "azad-source.online";

// Certificate
const privateKey = fs.readFileSync(
  `/etc/letsencrypt/live/${domain}/privkey.pem`,
  "utf8"
);
const certificate = fs.readFileSync(
  `/etc/letsencrypt/live/${domain}/cert.pem`,
  "utf8"
);
const ca = fs.readFileSync(`/etc/letsencrypt/live/${domain}/chain.pem`, "utf8");

const credentials = {
  key: privateKey,
  cert: certificate,
  ca: ca,
};

const RecipeRoute = require("./routes/recipe");

const isDev = false;

const dbName = "dish-recipes";

const mongoUrl = isDev
  ? `mongodb://localhost:27017/${dbName}`
  : `mongodb://${domain}:27017/${dbName}`; // 83.136.233.139:27017

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
app.use("/api/recipe", RecipeRoute);
app.use(express.static("public"));

// Starting both http & https servers
const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpServer.listen(80, () => {
  console.log("HTTP Server running on port 80");
});

httpsServer.listen(443, () => {
  console.log("HTTPS Server running on port 443");
});
