// controllers/userController.js
const User = require('../models/User');

// @route  GET /api/users/me   (protected)
const getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found.' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @route  PUT /api/users/me   (protected)
const updateMyProfile = async (req, res) => {
  try {
    const { name, skillOffered, skillWanted, level } = req.body;
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found.' });

    if (name) user.name = name;
    if (skillOffered) user.skillOffered = skillOffered;
    if (skillWanted) user.skillWanted = skillWanted;
    if (level) user.level = level;

    const updated = await user.save();
    res.json({ _id: updated._id, name: updated.name, email: updated.email, skillOffered: updated.skillOffered, skillWanted: updated.skillWanted, level: updated.level });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @route  GET /api/users   (protected) — all users except self
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.user._id } }).select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getMyProfile, updateMyProfile, getAllUsers };
