const express = require("express");
const passport = require("passport");

const { isSignedIn, isNotSignedIn } = require("../../middlewares/sign_in");
const {
  info,
  wikiHistory,
  bettingHistory,
} = require("../../controllers/userController/myPage");

const router = express.Router();
router.get("/wikihistory", isSignedIn, wikiHistory);
router.get("/info", isSignedIn, info);

router.get("/bettinghistory", isSignedIn, bettingHistory);
module.exports = router;
