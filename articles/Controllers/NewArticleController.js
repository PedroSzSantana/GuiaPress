const { Router } = require("express");
const NewArticleRouter = Router();

const Category = require("../../categories/ModelCategory");
const Article = require("../ModelArticles");
const auth = require("../../middleware/auth");

const slugify = require("slugify");

NewArticleRouter.get("/admin/articles/new", auth, async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.render("admin/articles/new", { categories });
  } catch (error) {
    console.log(error);
  }
});

NewArticleRouter.post("/articles/save", async (req, res) => {
  const { title, content, category } = req.body;
  console.log(title);
  if (!title || !content || !category) {
    res.redirect("/admin/articles/new");
  }
  try {
    await Article.create({
      title,
      body: content,
      slug: slugify(title),
      categoryId: category,
    });
    res.redirect("/admin/articles");
  } catch (error) {
    res.status(500).json({ error: "Falha ao salvar dado" });
  }
  res.status(200);
});
module.exports = NewArticleRouter;
