const User = require("../../models/user");
const passport = require("passport");

function userCheck(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  return res.redirect('/login');
}

module.exports = userCheck;
