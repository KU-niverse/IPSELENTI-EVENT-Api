const express = require("express");
const {
  userGetPoint,
} = require("../../controllers/userController/pointController");
const { isSignedIn, isNotSignedIn } = require("../../middlewares/sign_in");
const router = express.Router();
const point = require("../../middlewares/point");

// 전체 글 불러오기 / 전체 글 수정시 사용
//이부분 취약점이 있을 수 있음
router.get("/signup", point.signupPoint, userGetPoint); //1 회원가입시 10000p 지급
router.get("/attend", point.attendancePoint, userGetPoint); //2 출석시 15000p 지급(로그인 했을 때, 하루마다 초기화)
router.get("/recommended", point.recommendedPoint, userGetPoint); //3 추천인으로 지목당했을 때 20000p 지급
router.get("/recommender", point.recommenderPoint, userGetPoint); //4 추천인을 지목했을 때 30000p 지급
router.get("/wikiedit", point.wikiEditPoint, userGetPoint); //5 위키 수정시 15000p 지급(3회까지 가능, 하루마다 초기화)
router.get("/wikiaccess", point.wikiAccessPoint, userGetPoint); //6 위키 첫 접근시 5000p 지급(하루마다 초기화)

module.exports = router;
