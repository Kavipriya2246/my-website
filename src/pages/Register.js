// src/pages/Register.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../services/api';

const SKILL_OPTIONS = ['Python', 'JavaScript', 'React', 'Node.js', 'Figma', 'UI/UX Design',
  'Graphic Design', 'Photography', 'Video Editing', 'Music Production', 'Excel',
  'Data Analysis', 'Machine Learning', 'Public Speaking', 'Writing', 'Spanish', 'French'];

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', skillOffered: [], skillWanted: [], level: 'Beginner' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const toggleSkill = (skill, field) => {
    const list = form[field];
    setForm({ ...form, [field]: list.includes(skill) ? list.filter((s) => s !== skill) : [...list, skill] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) return setError('Please fill all required fields.');
    if (form.skillOffered.length === 0) return setError('Select at least one skill you can offer.');
    if (form.skillWanted.length === 0) return setError('Select at least one skill you want to learn.');
    setLoading(true); setError('');
    try {
      const { data } = await registerUser(form);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally { setLoading(false); }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card} className="card">
        <h2 style={styles.title}>Create Account</h2>
        <p style={styles.sub}>Join the skill exchange community</p>

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name *</label>
            <input name="name" placeholder="Your name" value={form.name} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Email *</label>
            <input name="email" type="email" placeholder="you@email.com" value={form.email} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Password *</label>
            <input name="password" type="password" placeholder="Min 6 characters" value={form.password} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Experience Level</label>
            <select name="level" value={form.level} onChange={handleChange}>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>

          {/* Skills Offered */}
          <div className="form-group">
            <label>Skills You Can Offer *</label>
            <div style={styles.skillGrid}>
              {SKILL_OPTIONS.map((s) => (
                <button key={s} type="button" onClick={() => toggleSkill(s, 'skillOffered')}
                  style={{ ...styles.skillBtn, ...(form.skillOffered.includes(s) ? styles.skillBtnActive : {}) }}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Skills Wanted */}
          <div className="form-group">
            <label>Skills You Want to Learn *</label>
            <div style={styles.skillGrid}>
              {SKILL_OPTIONS.map((s) => (
                <button key={s} type="button" onClick={() => toggleSkill(s, 'skillWanted')}
                  style={{ ...styles.skillBtn, ...(form.skillWanted.includes(s) ? styles.skillBtnWant : {}) }}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          <button className="btn-primary" type="submit" style={{ width: '100%', marginTop: '0.5rem' }} disabled={loading}>
            {loading ? 'Creating Account...' : 'Create Account →'}
          </button>
        </form>

        <p style={styles.footer}>Already have an account? <Link to="/login">Sign in</Link></p>
      </div>
    </div>
  );
};

const styles = {
  page: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '5rem 1rem 2rem' },
  card: { width: '100%', maxWidth: 520 },
  title: { fontSize: '1.6rem', marginBottom: '0.3rem' },
  sub: { color: 'var(--muted)', fontSize: '0.9rem', marginBottom: '1.5rem' },
  skillGrid: { display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.5rem' },
  skillBtn: { padding: '0.35rem 0.85rem', borderRadius: 50, fontSize: '0.8rem', background: 'var(--surface2)', color: 'var(--muted)', border: '1px solid var(--border)', cursor: 'pointer', transition: 'all 0.15s' },
  skillBtnActive: { background: 'var(--tag-bg)', color: 'var(--tag-text)', border: '1px solid rgba(108,99,255,0.4)' },
  skillBtnWant: { background: 'rgba(0,212,170,0.1)', color: '#6eecd8', border: '1px solid rgba(0,212,170,0.3)' },
  footer: { textAlign: 'center', marginTop: '1.25rem', color: 'var(--muted)', fontSize: '0.88rem' },
};

export default Register;
