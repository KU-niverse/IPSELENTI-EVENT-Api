const express = require("express");
const passport = require("passport");

const { isSignedIn, isNotSignedIn } = require("../../middlewares/sign_in");
const {
  signUp,
  signIn,
  signOut,
} = require("../../controllers/userController/auth");

const router = express.Router();

router.post("/signup", isNotSignedIn, signUp);

router.post("/signin", isNotSignedIn, signIn);

router.get("/signout", isSignedIn, signOut);

module.exports = router;
