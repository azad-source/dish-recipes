const fs = require("fs");
const http = require("http");
const https = require("https");
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const dbInfo = require("./access.js");
const RecipeRoute = require("./routes/recipe");

const domain = "azad-source.online";
const env = process.env.NODE_ENV || "development";
const isDev = env === "development";
const dbName = "dish-recipes";

let PORT, mongoUrl, dbConfig;

if (isDev) {
  PORT = 3000;
  mongoUrl = `mongodb://localhost:27017/${dbName}`;
  dbConfig = {};
} else {
  PORT = 80;
  mongoUrl = `mongodb://${domain}:27017/${dbName}`; // 83.136.233.139:27017
  dbConfig = {
    dbName,
    user: dbInfo.user,
    pass: dbInfo.pass,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
}

mongoose
  .connect(mongoUrl, dbConfig)
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

httpServer.listen(PORT, () => {
  console.log(`HTTP Server running on port ${PORT}`);
});

if (!isDev) {
  // ----------------- STARTING HTTPS (443) -----------------------------
  // Certificate
  const privateKey = `/etc/letsencrypt/live/${domain}/privkey.pem`;
  const certificate = `/etc/letsencrypt/live/${domain}/cert.pem`;
  const ca = `/etc/letsencrypt/live/${domain}/chain.pem`;

  const credentials = {
    key: fs.readFileSync(privateKey, "utf8"),
    cert: fs.readFileSync(certificate, "utf8"),
    ca: fs.readFileSync(ca, "utf8"),
  };

  const httpsServer = https.createServer(credentials, app);

  httpsServer.listen(443, () => {
    console.log("HTTPS Server running on port 443");
  });
}
