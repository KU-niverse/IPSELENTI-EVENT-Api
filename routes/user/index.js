const express = require("express");

const { isLoggedIn, isNotLoggedIn } = require("../../middlewares/sign_in");

const auth = require("./auth");
const info = require("./info");
const router = express.Router();

router.use("/auth", auth);

router.use("/info", info);
module.exports = router;
