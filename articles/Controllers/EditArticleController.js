const { Router } = require("express");
const EditArticleRouter = Router();

const Category = require("../../categories/ModelCategory");
const Article = require("../ModelArticles");

const slugify = require("slugify");

EditArticleRouter.get("/admin/articles/edit/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    const article = await Article.findByPk(id);
    const categories = await Category.findAll();
    if (article === null) {
      res.redirect("/admin/categories");
    }
    res.render("admin/articles/edit", { article, categories });
  } catch (error) {
    console.log(error);
  }
});
EditArticleRouter.get("/articles/edit", async (req, res) => {
  const { id, title, content, category } = req.body;
  try {
    await Article.update(
      { title, slug: slugify(title), body: content, category },
      { where: { id } }
    );
    res.render("admin/articles", { article, categories });
  } catch (error) {
    console.log(error);
  }
});
module.exports = EditArticleRouter;
