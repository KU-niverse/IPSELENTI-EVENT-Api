const express = require('express');
const commentMid = require('../controllers/commentController');

const router = express.Router();

// POST /comment
router.post('/', commentMid.commentPostMid);

// DELETE /comment
router.delete('/', commentMid.commentDeleteMid);

// POST /comment/like
router.post('/like', commentMid.commentLikePostMid);

// GET /comment/bytime
router.get('/bytime', commentMid.commentByTimeGetMid);

// GET /comment/bylike 
router.get('/bylike', commentMid.commentByLikeGetMid);

module.exports = router;