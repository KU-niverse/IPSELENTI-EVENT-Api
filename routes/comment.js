const express = require('express');
const commentMid = require('../controllers/commentController');
const { isSignedIn, isNotSignedIn } = require("../middlewares/sign_in");

const router = express.Router();

// POST /comment
router.post('/', isSignedIn, commentMid.commentPostMid);

// DELETE /comment
//router.delete('/', isSignedIn, commentMid.commentDeleteMid);

// POST /comment/like
router.post('/like', isSignedIn, commentMid.commentLikePostMid);

// GET /comment/bytime
router.get('/bytime', isSignedIn, commentMid.commentByTimeGetMid);

// GET /comment/bylike 
router.get('/bylike', isSignedIn, commentMid.commentByLikeGetMid);

module.exports = router;