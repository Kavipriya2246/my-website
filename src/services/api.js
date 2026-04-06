// src/services/api.js
import axios from 'axios';

const API = axios.create({ baseURL: '/api' });

// Attach JWT token to every request automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

// ── AUTH ────────────────────────────────────────
export const registerUser = (data) => API.post('/auth/register', data);
export const loginUser = (data) => API.post('/auth/login', data);

// ── USER / PROFILE ──────────────────────────────
export const getMyProfile = () => API.get('/users/me');
export const updateMyProfile = (data) => API.put('/users/me', data);
export const getAllUsers = () => API.get('/users');

// ── MATCHES ─────────────────────────────────────
export const getMatches = () => API.get('/matches');
export const sendMatchRequest = (userId) => API.post('/matches/request', { userId });
export const acceptMatch = (matchId) => API.put(`/matches/${matchId}/accept`);

export default API;
