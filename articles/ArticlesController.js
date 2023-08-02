const { Router } = require("express");
const ArticlesRoutes = Router();

const Article = require("./ModelArticles");
const Category = require("../categories/ModelCategory");

const {
  EditArticleRouter,
  DeleteArticleRouter,
  NewArticleRouter,
} = require("./Controllers");

ArticlesRoutes.get("/admin/articles", async (req, res) => {
  try {
    const articles = await Article.findAll({
      include: [{ model: Category }],
    });
    res.render("admin/articles/index", { articles });
  } catch (error) {
    console.log(error);
  }
});
ArticlesRoutes.get("/articles/page/:num", async (req, res) => {
  try {
    const Numpage = req.params.num;
    let offset = 0;
    let limit = 4;
    if (isNaN(Numpage) || Numpage < 1) {
      res.redirect("/");
    }
    if (isNaN(Numpage) || Numpage == 1) {
      offset = 0;
    } else {
      offset = parseInt(Numpage - 1) * limit;
    }
    // offset = ele vai retornar a partir de qual artigo
    const articles = await Article.findAndCountAll({
      limit,
      offset,
      order: [["id", "desc"]],
    });
    let next;
    if (offset + parseInt(limit) >= articles.count) {
      next = false;
    } else {
      next = true;
    }
    let result = {
      page: parseInt(Numpage),
      next,
      articles,
    };
    const categories = await Category.findAll();
    res.render("admin/articles/page", { result, categories });
  } catch (error) {
    res.render("index");
    console.log("Error --------------------", error);
  }
});
ArticlesRoutes.use(EditArticleRouter);
ArticlesRoutes.use(DeleteArticleRouter);
ArticlesRoutes.use(NewArticleRouter);

module.exports = ArticlesRoutes;
