const { Router } = require("express");
const User = require("./ModelUser");
const UserRoutes = Router();
const CreateUserRouter = require("./controller/CreateUser");

UserRoutes.get("/admin/users", async (req, res) => {
  const users = await User.findAll();
  res.render("admin/users/index", { users });
});

UserRoutes.use(CreateUserRouter);

module.exports = UserRoutes;
