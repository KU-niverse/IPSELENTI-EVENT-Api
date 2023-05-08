const express = require("express");
const passport = require("passport");

const { isSignedIn, isNotSignedIn } = require("../../middlewares/sign_in");
const {
  info,
  wikiHistorys,
} = require("../../controllers/userController/myPage");

const router = express.Router();
router.get("/wikihistorys", isSignedIn, wikiHistorys);
router.get("/info", isSignedIn, info);

module.exports = router;
