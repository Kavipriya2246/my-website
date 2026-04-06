// controllers/authController.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Generate JWT
const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

// @route  POST /api/auth/register
const registerUser = async (req, res) => {
  try {
    const { name, email, password, skillOffered, skillWanted, level } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ message: 'Name, email and password are required.' });

    const exists = await User.findOne({ email });
    if (exists)
      return res.status(400).json({ message: 'An account with this email already exists.' });

    const user = await User.create({ name, email, password, skillOffered, skillWanted, level });

    res.status(201).json({
      token: generateToken(user._id),
      user: { _id: user._id, name: user.name, email: user.email, skillOffered: user.skillOffered, skillWanted: user.skillWanted, level: user.level },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @route  POST /api/auth/login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password)))
      return res.status(401).json({ message: 'Invalid email or password.' });

    res.json({
      token: generateToken(user._id),
      user: { _id: user._id, name: user.name, email: user.email, skillOffered: user.skillOffered, skillWanted: user.skillWanted, level: user.level },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { registerUser, loginUser };
