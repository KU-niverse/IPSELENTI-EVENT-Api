const express = require("express");

const { isLoggedIn, isNotLoggedIn } = require("../../middlewares/sign_in");

const auth = require("./auth");

const router = express.Router();

router.use("/auth", auth);

module.exports = router;
