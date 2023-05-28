require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const db = require("./app/models");
const logger = require("morgan");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());
app.use(express.static("app.public"));

const title = process.env.TITLE || "travel API";
const port = process.env.PORT || 3000;
const baseUrl = process.env.URL + port || "http://locahost:" + port;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access_Control-Allow-Header",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-access-token"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

require("./app/routes/router.js")(app);

db.sequelize
  .sync()
  .then(() => {
    app.listen(port, () => console.log(title + " running on " + baseUrl));
  })
  .catch((err) => {
    console.log("server error", err);
  });

const Role = require("./app/models").Role;

function create_roles() {
  Role.create({
    id: 1,
    nama: "USER",
  });

  Role.create({
    id: 2,
    nama: "ADMIN",
  });

  Role.create({
    id: 3,
    nama: "PM",
  });
}

// create_roles();
