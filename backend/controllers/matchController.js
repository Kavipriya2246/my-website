// controllers/matchController.js
const Match = require('../models/Match');
const User = require('../models/User');

// ── MATCHING ALGORITHM ────────────────────────────────────────────────────────
// Score = how well two users can swap skills with each other.
//
// Logic:
//   If User A offers what User B wants  →  +1 per overlapping skill
//   If User A wants what User B offers  →  +1 per overlapping skill
//   Normalised to a 0–100 percentage.
//
// "A system that connects users based on skills they offer and skills they need."
const computeMatchScore = (userA, userB) => {
  const aOffersWhatBWants = userA.skillOffered.filter((s) => userB.skillWanted.includes(s)).length;
  const bOffersWhatAWants = userB.skillOffered.filter((s) => userA.skillWanted.includes(s)).length;

  const maxPossible = Math.max(
    userA.skillOffered.length + userA.skillWanted.length,
    userB.skillOffered.length + userB.skillWanted.length,
    1
  );

  return Math.round(((aOffersWhatBWants + bOffersWhatAWants) / (maxPossible * 2)) * 100);
};

// @route  GET /api/matches   (protected)
// Returns all match requests involving the logged-in user
const getMatches = async (req, res) => {
  try {
    const matches = await Match.find({
      $or: [{ user1: req.user._id }, { user2: req.user._id }],
    })
      .populate('user1', 'name email skillOffered skillWanted level')
      .populate('user2', 'name email skillOffered skillWanted level');

    res.json(matches);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @route  POST /api/matches/request   (protected)
// Send a match request to another user
const sendMatchRequest = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ message: 'Target userId is required.' });
    if (userId === String(req.user._id))
      return res.status(400).json({ message: 'You cannot request a match with yourself.' });

    // Check if a match already exists between these two users
    const existing = await Match.findOne({
      $or: [
        { user1: req.user._id, user2: userId },
        { user1: userId, user2: req.user._id },
      ],
    });
    if (existing) return res.status(400).json({ message: 'A match request already exists.' });

    // Compute score before creating
    const [me, other] = await Promise.all([
      User.findById(req.user._id),
      User.findById(userId),
    ]);
    if (!other) return res.status(404).json({ message: 'User not found.' });

    const score = computeMatchScore(me, other);

    const match = await Match.create({ user1: req.user._id, user2: userId, score });
    res.status(201).json({ match, score });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @route  PUT /api/matches/:id/accept   (protected)
const acceptMatch = async (req, res) => {
  try {
    const match = await Match.findById(req.params.id);
    if (!match) return res.status(404).json({ message: 'Match not found.' });
    if (String(match.user2) !== String(req.user._id))
      return res.status(403).json({ message: 'Only the recipient can accept this request.' });

    match.status = 'accepted';
    await match.save();
    res.json(match);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @route  PUT /api/matches/:id/reject   (protected)
const rejectMatch = async (req, res) => {
  try {
    const match = await Match.findById(req.params.id);
    if (!match) return res.status(404).json({ message: 'Match not found.' });

    match.status = 'rejected';
    await match.save();
    res.json(match);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getMatches, sendMatchRequest, acceptMatch, rejectMatch, computeMatchScore };
