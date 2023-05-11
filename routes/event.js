const express = require('express');
const eventMid = require('../controllers/eventController');

const router = express.Router();

// POST /event/celebrity_request
router.post('/celebrityrequest', eventMid.requestPostMid);

// GET /event/celebrity_request
router.get('/celebrityrequest', eventMid.requestGetByIdMid);

// GET /event/events
router.get('/events', eventMid.celebsGetAllMid);

// GET /event/user/:userid
router.get('/user/:userid', eventMid.bettingGetMid);

module.exports = router;