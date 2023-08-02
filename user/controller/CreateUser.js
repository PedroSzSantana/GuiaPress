const { Router } = require("express");
const User = require("../ModelUser");
const CreateUserRouter = Router();
const bcrypt = require("bcrypt");
CreateUserRouter.get("/admin/users/create", (req, res) => {
  res.render("admin/users/create");
});
CreateUserRouter.post("/users/create", async (req, res) => {
  try {
    const { email, password } = req.body;

    const checkEmail = await User.findOne({ where: { email } });
    console.log(checkEmail);
    if (checkEmail) {
      return res.redirect("/admin/users/create");
    }

    const salt = await bcrypt.genSalt(12);
    const passHash = bcrypt.hashSync(password, salt);

    await User.create({ email, password: passHash });
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
});
module.exports = CreateUserRouter;
