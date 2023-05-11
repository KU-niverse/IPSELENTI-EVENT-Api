const express = require("express");
const passport = require("passport");
const { isAdmin } = require("../../middlewares/admin");
const { isSignedIn, isNotSignedIn } = require("../../middlewares/sign_in");
const { setConstraint } = require("../../controllers/userController/admin");

const router = express.Router();

router.get("/setconstraint/:userid", isSignedIn, isAdmin, setConstraint);
module.exports = router;
