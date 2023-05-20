const express = require("express");
const passport = require("passport");

const { isSignedIn, isNotSignedIn } = require("../../middlewares/sign_in");
const { shareInfo } = require("../../controllers/userController/shareInfo");

const router = express.Router();

router.get("/most", isSignedIn, shareInfo);

module.exports = router;
