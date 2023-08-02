const bodyParser = require("body-parser");
const express = require("express");
const session = require("express-session");
const connection = require("./db/db");

const CategoriesRoutes = require("./categories/CategoriesController");
const ArticlesRoutes = require("./articles/ArticlesController");
const IndexRouter = require("./index/indexController");
const UserRoutes = require("./user/userController");
const app = express();

app.set("view engine", "ejs");

app.use(
  session({
    secret: "123456",
    cookie: {
      maxAge: 30000,
    },
  })
);

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(IndexRouter);
app.use(UserRoutes);
app.use(CategoriesRoutes);
app.use(ArticlesRoutes);

connection
  .authenticate()
  .then(() => console.log("Conexão feita com sucesso"))
  .catch((err) => console.log(err));

module.exports = app;
