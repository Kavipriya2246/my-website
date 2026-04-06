// routes/matchRoutes.js
const express = require('express');
const router = express.Router();
const { getMatches, sendMatchRequest, acceptMatch, rejectMatch } = require('../controllers/matchController');
const { protect } = require('../middleware/authMiddleware');

// GET  /api/matches              — all matches for logged-in user
router.get('/', protect, getMatches);

// POST /api/matches/request      — send match request
router.post('/request', protect, sendMatchRequest);

// PUT  /api/matches/:id/accept   — accept a request
router.put('/:id/accept', protect, acceptMatch);

// PUT  /api/matches/:id/reject   — reject a request
router.put('/:id/reject', protect, rejectMatch);

module.exports = router;
