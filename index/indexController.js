const { Router } = require("express");
const IndexRouter = Router();

const Article = require("../articles/ModelArticles");
const Category = require("../categories/ModelCategory");

IndexRouter.get("/", async (req, res) => {
  try {
    const articles = await Article.findAll({
      limit: 4,
      order: [["id", "desc"]],
    });
    const categories = await Category.findAll();
    res.render("index", { articles, categories });
  } catch (error) {
    console.log(error);
  }
});
IndexRouter.get("/:slug", async (req, res) => {
  try {
    const slug = req.params.slug;
    console.log("----------------------------------------", slug);
    const article = await Article.findOne({
      where: {
        slug,
      },
    });
    if (!article) {
      res.redirect("/");
    }
    console.log("fweeeeeeeeeeeee", article);
    const categories = await Category.findAll();
    res.render("article", { article, categories });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

IndexRouter.get("/category/:slug", async (req, res) => {
  try {
    const slug = req.params.slug;
    const category = await Category.findOne({
      where: {
        slug,
      },
      include: [{ model: Article }],
    });
    const categories = await Category.findAll();
    res.render("index", { articles: category.articles, categories });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});
module.exports = IndexRouter;
