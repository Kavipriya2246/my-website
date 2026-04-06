// src/pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getMyProfile, getMatches } from '../services/api';
import SkillCard from '../components/SkillCard';

const StatCard = ({ label, value, color }) => (
  <div style={{ background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 12, padding: '1.25rem 1.5rem' }}>
    <div style={{ fontSize: '0.78rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>{label}</div>
    <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '2rem', color: color || 'var(--text)' }}>{value}</div>
  </div>
);

const Dashboard = () => {
  const [profile, setProfile] = useState(null);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pRes, mRes] = await Promise.all([getMyProfile(), getMatches()]);
        setProfile(pRes.data);
        setMatches(mRes.data);
      } catch (err) {
        console.error(err);
      } finally { setLoading(false); }
    };
    fetchData();
  }, []);

  if (loading) return <div style={styles.loading}>Loading dashboard...</div>;

  const accepted = matches.filter((m) => m.status === 'accepted').length;
  const pending = matches.filter((m) => m.status === 'pending').length;

  return (
    <div className="page">
      {/* Greeting */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 className="page-title">Dashboard</h1>
        <p className="page-sub">Welcome back, {profile?.name || 'User'} 👋</p>
      </div>

      {/* Stats */}
      <div style={styles.statsGrid}>
        <StatCard label="Skills Offered" value={profile?.skillOffered?.length || 0} color="var(--tag-text)" />
        <StatCard label="Skills Wanted" value={profile?.skillWanted?.length || 0} color="#6eecd8" />
        <StatCard label="Active Swaps" value={accepted} color="var(--accent2)" />
        <StatCard label="Pending Requests" value={pending} color="#ffaaaa" />
      </div>

      {/* Skills summary */}
      <div style={styles.twoCol}>
        <div className="card">
          <h3 style={styles.cardTitle}>Skills I Offer</h3>
          <div style={{ marginTop: '0.75rem' }}>
            {profile?.skillOffered?.length
              ? profile.skillOffered.map((s) => <SkillCard key={s} skill={s} type="offer" />)
              : <p style={{ color: 'var(--muted)', fontSize: '0.88rem' }}>No skills added yet.</p>}
          </div>
        </div>
        <div className="card">
          <h3 style={styles.cardTitle}>Skills I Want</h3>
          <div style={{ marginTop: '0.75rem' }}>
            {profile?.skillWanted?.length
              ? profile.skillWanted.map((s) => <SkillCard key={s} skill={s} type="want" />)
              : <p style={{ color: 'var(--muted)', fontSize: '0.88rem' }}>No skills added yet.</p>}
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div style={styles.actions}>
        <Link to="/matches"><button className="btn-primary">🔍 Find Matches</button></Link>
        <Link to="/profile"><button className="btn-outline">✏️ Edit Profile</button></Link>
      </div>
    </div>
  );
};

const styles = {
  loading: { minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--muted)' },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem', marginBottom: '1.5rem' },
  twoCol: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '1.5rem' },
  cardTitle: { fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: '1rem' },
  actions: { display: 'flex', gap: '1rem', flexWrap: 'wrap' },
};

export default Dashboard;
