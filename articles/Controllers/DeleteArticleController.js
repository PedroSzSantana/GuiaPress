const { Router } = require("express");
const DeleteArticleRouter = Router();
const Article = require("../ModelArticles");

DeleteArticleRouter.post("/articles/delete", async (req, res) => {
  const id = req.body.id;
  if (id === undefined) {
    res.redirect("/admin/articles");
  }
  if (!isNaN(id)) {
    res.redirect("/admin/articles");
  }
  try {
    await Article.destroy({
      where: {
        id,
      },
    });
    res.redirect("/admin/articles");
  } catch (error) {
    console.log(error);
  }
});
module.exports = DeleteArticleRouter;
