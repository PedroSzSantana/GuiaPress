const { Router } = require("express");
const User = require("./ModelUser");
const UserRoutes = Router();
const CreateUserRouter = require("./controller/CreateUser");
const LoginUserRouter = require("./controller/LoginUser");
const auth = require("../middleware/auth");

UserRoutes.get("/admin/users", auth, async (req, res) => {
  const users = await User.findAll();
  res.render("admin/users/index", { users });
});
UserRoutes.use(LoginUserRouter);
UserRoutes.use(CreateUserRouter);
module.exports = UserRoutes;
