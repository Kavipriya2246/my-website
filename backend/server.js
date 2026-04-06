// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// ── Routes ──
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const matchRoutes = require('./routes/matchRoutes');

connectDB();

const app = express();

// ── Middleware ──
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());

// ── API Routes ──
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/matches', matchRoutes);

// ── Health check ──
app.get('/', (req, res) => res.json({ message: '✅ Skill Swap API is running.' }));

// ── 404 handler ──
app.use((req, res) => res.status(404).json({ message: 'Route not found.' }));

// ── Error handler ──
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error.' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
