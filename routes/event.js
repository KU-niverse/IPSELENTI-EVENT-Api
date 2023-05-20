const express = require('express');
const eventMid = require('../controllers/eventController');
const { isSignedIn, isNotSignedIn } = require("../middlewares/sign_in");

const router = express.Router();

// POST /event/celebrityrequest
router.post('/celebrityrequest', isSignedIn, eventMid.requestPostMid);

// GET /event/celebrityrequest
router.get('/celebrityrequest', isSignedIn, eventMid.requestGetByIdMid);

// GET /event/celebrities
router.get('/celebrities', eventMid.celebsGetAllMid);

// GET /event/artist/:artistid
router.get('/artist/:artistid', isSignedIn, eventMid.BettingHistoryGetMid);

// PUT /event/artist/:artistid
router.put('/artist/:artistid', isSignedIn, eventMid.BettingPointPutMid);

// GET /event/user
router.get('/user', isSignedIn, eventMid.bettingGetMid);

module.exports = router;