const express = require('express');
const eventMid = require('../controllers/eventController');

const router = express.Router();

// POST /event/celebrityrequest
router.post('/celebrityrequest', eventMid.requestPostMid);

// GET /event/celebrityrequest
router.get('/celebrityrequest', eventMid.requestGetByIdMid);

// GET /event/celebrities
router.get('/celebrities', eventMid.celebsGetAllMid);

// GET /event/user/:userid
router.get('/user/:userid', eventMid.bettingGetMid);

module.exports = router;