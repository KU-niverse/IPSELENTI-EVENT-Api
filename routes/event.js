const express = require('express');
const eventMid = require('../controllers/eventController');
const { isSignedIn, isNotSignedIn } = require("../middlewares/sign_in");

const router = express.Router();

// POST /event/celebrityrequest
router.post('/celebrityrequest', isSignedIn, eventMid.requestPostMid);

// GET /event/celebrityrequest
router.get('/celebrityrequest', isSignedIn, eventMid.requestGetByIdMid);

// GET /event/celebrities
router.get('/celebrities', isSignedIn, eventMid.celebsGetAllMid);

// GET /event/user/:userid/artist/:artistid
router.get('/user/:userid/artist/:artistid', isSignedIn, eventMid.BettingHistoryGetMid);

// PUT /event/user/:userid/artist/:artistid
router.put('/user/:userid/artist/:artistid', isSignedIn, eventMid.BettingPointPutMid);

// GET /event/user/:userid
router.get('/user/:userid', isSignedIn, eventMid.bettingGetMid);

module.exports = router;