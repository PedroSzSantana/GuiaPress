const { Router } = require("express");
const Category = require("../ModelCategory");
const EditCategoryRouter = Router();
const slugify = require("slugify");
const auth = require("../../middleware/auth");

EditCategoryRouter.get("/admin/categories/edit/:id", auth, async (req, res) => {
  const id = req.params.id;
  try {
    const category = await Category.findByPk(id);
    if (category === null) {
      res.redirect("/admin/categories");
    }
    res.render("admin/categories/edit", { category });
  } catch (error) {
    console.log(error);
  }
});

EditCategoryRouter.post("/categories/update", async (req, res) => {
  const { id, title } = req.body;
  try {
    await Category.update({ title, slug: slugify(title) }, { where: { id } });
    res.redirect("/admin/categories");
  } catch (error) {
    console.log(error);
  }
});
module.exports = EditCategoryRouter;
