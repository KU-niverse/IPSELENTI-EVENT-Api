const express = require("express");
const passport = require("passport");

const { isSignedIn, isNotSignedIn } = require("../../middlewares/sign_in");
const { info } = require("../../controllers/userController/myPage");

const router = express.Router();
router.get("/historys/:userid", isSignedIn, info);
router.get("/", isSignedIn, info);

module.exports = router;
