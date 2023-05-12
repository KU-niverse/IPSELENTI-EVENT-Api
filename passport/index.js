const passport = require("passport");
const local = require("./localStrategy.js");
const kakao = require("./kakaoStrategy");
const User = require("../models/userModel.js");

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user[0].user_id);
  });

  passport.deserializeUser((id, done) => {
    User.find_user(id)
      .then((user) => done(null, user))
      .catch((err) => done(err));
  });

  local();
  /* kakao(); */
};
