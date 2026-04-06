// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { getMyProfile, updateMyProfile, getAllUsers } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// GET  /api/users      — all users (for match discovery)
router.get('/', protect, getAllUsers);

// GET  /api/users/me   — logged-in user's profile
router.get('/me', protect, getMyProfile);

// PUT  /api/users/me   — update profile / skills
router.put('/me', protect, updateMyProfile);

module.exports = router;
