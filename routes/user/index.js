const express = require("express");

const { isLoggedIn, isNotLoggedIn } = require("../../middlewares/sign_in");

const auth = require("./auth");
const mypage = require("./mypage");
const admin = require("./admin");
const point = require("./point");
const shareInfo = require("./shareInfo");
const router = express.Router();

router.use("/auth", auth);
router.use("/mypage", mypage);
router.use("/admin", admin);
router.use("/point", point);
router.use("/shareInfo", shareInfo);
module.exports = router;
