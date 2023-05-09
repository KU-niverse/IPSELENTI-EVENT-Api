const express = require('express');
const wikiMid = require('../controllers/wikiController');

const router = express.Router();

// 전체 글 불러오기 / 전체 글 수정시 사용
router.get('/contents', wikiMid.contentsGetMid);

// 전체 글 수정하기
router.post('/contents', wikiMid.contentsPostMid);

// 특정 섹션의 글 불러오기 / 특정 섹션의 글 수정시 사용
router.get('/contents/:section', wikiMid.contentsSectionGetMid);

// 특정 섹션의 글 수정하기
router.post('/contents/:section', wikiMid.contentsSectionPostMid);

// 위키 전체 히스토리 불러오기
router.get('/history', wikiMid.historyGetMid);

// 특정 버전의 위키 raw data 불러오기
router.get('/history/:version', wikiMid.historyVersionGetMid);

// 특정 버전으로 롤백하기
router.post('/history/:version', wikiMid.historyVersionPostMid);

module.exports = router;