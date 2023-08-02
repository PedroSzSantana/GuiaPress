const { Router } = require("express");
const User = require("../ModelUser");
const LoginUserRouter = Router();
const bcrypt = require("bcrypt");

LoginUserRouter.get("/login", (req, res) => {
  res.render("admin/users/login");
});
LoginUserRouter.post("/authenticate", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (user === undefined) {
      res.redirect("/login");
    }
    const checkPass = await bcrypt.compareSync(password, user.password);

    if (!checkPass) {
      res.redirect("/login");
    }
    req.session.user = { id: user.id, email: user.email };
    res.json(req.session.user);
  } catch (error) {
    console.log(error);
  }
});
module.exports = LoginUserRouter;
