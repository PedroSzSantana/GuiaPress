const auth = async (req, res, next) => {
  if (req.session.user != undefined) {
    next();
  } else {
    res.redirect("/auth/admin");
  }
};
module.exports = auth;
