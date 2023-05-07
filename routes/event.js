const express = require('express');
const eventMid = require('../controllers/eventController');

const router = express.Router();

// POST /event/celebrity_request
router.post('/celebrity_request', eventMid.requestPostMid);

// GET /event/celebrity_request
router.get('/celebrity_request', eventMid.requestGetByIdMid);

// GET /event/events
router.get('/events');

// GET /event/user/:userid
router.get('/user/:userid');

module.exports = router;