const express = require("express");
const {
  userGetPoint,
} = require("../../controllers/userController/pointController");
const { isSignedIn, isNotSignedIn } = require("../../middlewares/sign_in");
const router = express.Router();

// 전체 글 불러오기 / 전체 글 수정시 사용
//이부분 취약점이 있을 수 있음
router.get("/signup", userGetPoint);
router.get("/attend", userGetPoint);
router.get("/recommended", userGetPoint);
router.get("/recommender", userGetPoint);
router.get("/wikiedit", userGetPoint);
router.get("/wikiaccess", userGetPoint);

module.exports = router;
