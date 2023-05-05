const express = require('express');
const wikiMid = require('../controllers/wikiController');

const router = express.Router();

router.get('/contents', wikiMid.contentsGetMid);

router.post('/contents', wikiMid.contentsPostMid);

router.get('/contents/:section', wikiMid.contentsSectionGetMid);

router.post('/contents/:section', wikiMid.contentsSectionPostMid);

router.get('/history', wikiMid.historyGetMid);

router.get('/history/:version', wikiMid.historyVersionGetMid);

router.post('/history/:version', wikiMid.historyVersionPostMid);

module.exports = router;