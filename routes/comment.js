const express = require('express');
const commentMid = require('../controllers/commentController');

const router = express.Router();

// POST /comment
router.post('/', commentMid.commentPostMid);

// DELETE /comment
router.delete('/', commentMid.commentDeleteMid);

// POST /comment/like
router.post('/like', commentMid.commentLikePostMid);

// GET /comment/by_time
router.get('/by_time', commentMid.commentByTimeGetMid);

// GET /comment/by_like 
router.get('/by_like', commentMid.commentByLikeGetMid);

module.exports = router;