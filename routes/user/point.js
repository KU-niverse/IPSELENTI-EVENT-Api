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
router.get("/attend", isSignedIn, point.attendancePoint, userGetPoint); //2 출석시 15000p 지급(로그인 했을 때, 하루마다 초기화)
router.get("/recommended", point.recommendedPoint, userGetPoint); //3 추천인으로 지목당했을 때 20000p 지급
router.get("/recommender", point.recommenderPoint, userGetPoint); //4 추천인을 지목했을 때 30000p 지급
router.get("/wikiedit", isSignedIn, point.wikiEditPoint, userGetPoint); //5 위키 수정시 15000p 지급(3회까지 가능, 하루마다 초기화)
router.get("/wikiaccess", isSignedIn, point.wikiAccessPoint, userGetPoint); //6 위키 첫 접근시 5000p 지급(하루마다 초기화)

//1,3,4는 백엔드에서 처리
//2는 로그인 성공했을 때 호출
//5,6은 위키 수정 성공했을 때(전체 및 섹션) 호출, 위키 전체글 불러올 때 호출

module.exports = router;
