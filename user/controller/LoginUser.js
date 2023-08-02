const { Router } = require("express");
const User = require("../ModelUser");
const LoginUserRouter = Router();
const bcrypt = require("bcrypt");

LoginUserRouter.get("/auth/admin", (req, res) => {
  res.render("admin/users/login");
});
LoginUserRouter.post("/authenticate", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (user === undefined) {
      res.redirect("/auth/admin");
    }
    const checkPass = await bcrypt.compareSync(password, user.password);

    if (!checkPass) {
      res.redirect("/auth/admin");
    }
    req.session.user = { id: user.id, email: user.email };
    res.redirect("/admin/articles");
  } catch (error) {
    console.log(error);
  }
});
module.exports = LoginUserRouter;
