const { Router } = require("express");
const Category = require("./ModelCategory");
const CategoriesRoutes = Router();
const auth = require("../middleware/auth");

const {
  EditCategoryRouter,
  DeleteCategoryRouter,
  NewCategoryRouter,
} = require("./Controllers");

CategoriesRoutes.get("/admin/categories", auth, async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.render("admin/categories/index", { categories });
  } catch (error) {
    console.log(error);
  }
});

CategoriesRoutes.use(EditCategoryRouter);
CategoriesRoutes.use(DeleteCategoryRouter);
CategoriesRoutes.use(NewCategoryRouter);

module.exports = CategoriesRoutes;
