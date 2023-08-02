const { Router } = require("express");
const Category = require("../ModelCategory");
const DeleteCategoryRouter = Router();

DeleteCategoryRouter.post("/categories/delete", async (req, res) => {
  const id = req.body.id;
  console.log(id);
  if (id === undefined) {
    res.redirect("/admin/categories");
  }
  if (!isNaN(id)) {
    res.redirect("/admin/categories");
  }
  try {
    await Category.destroy({
      where: {
        id,
      },
    });
    res.redirect("/admin/categories");
  } catch (error) {
    console.log(error);
  }
});
module.exports = DeleteCategoryRouter;
