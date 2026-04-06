// src/pages/Profile.js
import React, { useEffect, useState } from 'react';
import { getMyProfile, updateMyProfile } from '../services/api';

const SKILL_OPTIONS = ['Python', 'JavaScript', 'React', 'Node.js', 'Figma', 'UI/UX Design',
  'Graphic Design', 'Photography', 'Video Editing', 'Music Production', 'Excel',
  'Data Analysis', 'Machine Learning', 'Public Speaking', 'Writing', 'Spanish', 'French'];

const Profile = () => {
  const [form, setForm] = useState({ name: '', email: '', skillOffered: [], skillWanted: [], level: 'Beginner' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    getMyProfile()
      .then(({ data }) => setForm(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const toggleSkill = (skill, field) => {
    const list = form[field];
    setForm({ ...form, [field]: list.includes(skill) ? list.filter((s) => s !== skill) : [...list, skill] });
  };

  const handleSave = async () => {
    setSaving(true); setMsg('');
    try {
      await updateMyProfile(form);
      localStorage.setItem('user', JSON.stringify({ name: form.name, email: form.email }));
      setMsg('Profile updated successfully!');
    } catch (err) {
      setMsg('Failed to update profile.');
    } finally { setSaving(false); }
  };

  if (loading) return <div style={{ padding: '5rem', textAlign: 'center', color: 'var(--muted)' }}>Loading...</div>;

  return (
    <div className="page" style={{ maxWidth: 620 }}>
      <h1 className="page-title">My Profile</h1>
      <p className="page-sub">Manage your account and skill preferences</p>

      {msg && <div className={`alert ${msg.includes('success') ? 'alert-success' : 'alert-error'}`}>{msg}</div>}

      <div className="card" style={{ marginBottom: '1.25rem' }}>
        <h3 style={styles.sectionTitle}>Account Info</h3>
        <div className="form-group">
          <label>Full Name</label>
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input value={form.email} disabled style={{ opacity: 0.6 }} />
        </div>
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label>Experience Level</label>
          <select value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value })}>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '1.25rem' }}>
        <h3 style={styles.sectionTitle}>Skills I Offer <span style={styles.count}>{form.skillOffered.length} selected</span></h3>
        <div style={styles.skillGrid}>
          {SKILL_OPTIONS.map((s) => (
            <button key={s} type="button" onClick={() => toggleSkill(s, 'skillOffered')}
              style={{ ...styles.skillBtn, ...(form.skillOffered.includes(s) ? styles.offer : {}) }}>
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <h3 style={styles.sectionTitle}>Skills I Want <span style={styles.count}>{form.skillWanted.length} selected</span></h3>
        <div style={styles.skillGrid}>
          {SKILL_OPTIONS.map((s) => (
            <button key={s} type="button" onClick={() => toggleSkill(s, 'skillWanted')}
              style={{ ...styles.skillBtn, ...(form.skillWanted.includes(s) ? styles.want : {}) }}>
              {s}
            </button>
          ))}
        </div>
      </div>

      <button className="btn-primary" style={{ width: '100%' }} onClick={handleSave} disabled={saving}>
        {saving ? 'Saving...' : 'Save Changes'}
      </button>
    </div>
  );
};

const styles = {
  sectionTitle: { fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: '1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' },
  count: { fontFamily: "'DM Sans', sans-serif", fontWeight: 400, fontSize: '0.75rem', color: 'var(--muted)', marginLeft: 'auto' },
  skillGrid: { display: 'flex', flexWrap: 'wrap', gap: '0.4rem' },
  skillBtn: { padding: '0.35rem 0.85rem', borderRadius: 50, fontSize: '0.8rem', background: 'var(--surface2)', color: 'var(--muted)', border: '1px solid var(--border)', cursor: 'pointer', transition: 'all 0.15s' },
  offer: { background: 'var(--tag-bg)', color: 'var(--tag-text)', border: '1px solid rgba(108,99,255,0.4)' },
  want: { background: 'rgba(0,212,170,0.1)', color: '#6eecd8', border: '1px solid rgba(0,212,170,0.3)' },
};

export default Profile;
