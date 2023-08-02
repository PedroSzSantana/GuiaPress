const { Router } = require("express");
const Category = require("../ModelCategory");
const NewCategoryRouter = Router();
const slugify = require("slugify");
const auth = require("../../middleware/auth");

NewCategoryRouter.get("/admin/categories/new", auth, (req, res) => {
  res.render("admin/categories/new");
});

NewCategoryRouter.post("/categories/save", async (req, res) => {
  const title = req.body.title;
  console.log(title);
  if (!title) {
    res.redirect("/admin/categories/new");
  }
  try {
    await Category.create({
      title,
      slug: slugify(title),
    });
    res.redirect("/admin/categories");
  } catch (error) {
    res.status(500).json({ error: "Falha ao salvar dado" });
  }
  res.status(200);
});
module.exports = NewCategoryRouter;
