const express = require('express');
const wikiMid = require('../controllers/wikiController');
const { isSignedIn } = require('../middlewares/sign_in');

const router = express.Router();

// 전체 글 불러오기 / 전체 글 수정시 사용
router.get('/contents', wikiMid.contentsGetMid);
//이거 요청할 때 /user/point/wikiaccess 도 같이 요청해야함

// 전체 글 수정하기
router.post('/contents', isSignedIn, wikiMid.contentsPostMid);
//이거 성공 status 코드 받았을 때 /user/point/wikiedit 요청해야함

// 특정 섹션의 글 불러오기 / 특정 섹션의 글 수정시 사용
router.get('/contents/:section', isSignedIn, wikiMid.contentsSectionGetMid);

// 특정 섹션의 글 수정하기
router.post('/contents/:section', isSignedIn, wikiMid.contentsSectionPostMid);
//이거 성공 status 코드 받았을 때 /user/point/wikiedit 요청해야함

// 위키 전체 히스토리 불러오기
router.get('/historys', wikiMid.historyGetMid);

// 특정 버전의 위키 raw data 불러오기
router.get('/historys/:version', wikiMid.historyVersionGetMid);

// 특정 버전으로 롤백하기
router.post('/historys/:version', isSignedIn, wikiMid.historyVersionPostMid);

// 두 버전 비교하기
router.get('/comparison/:rev/:oldrev', wikiMid.comparisonGetMid);

module.exports = router;