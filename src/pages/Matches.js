// src/pages/Matches.js
import React, { useEffect, useState } from 'react';
import { getMatches, getAllUsers, getMyProfile } from '../services/api';
import MatchCard from '../components/MatchCard';

// Core matching algorithm — same logic as backend
const computeScore = (me, other) => {
  const offerOverlap = (me.skillOffered || []).filter((s) => (other.skillWanted || []).includes(s)).length;
  const wantOverlap = (me.skillWanted || []).filter((s) => (other.skillOffered || []).includes(s)).length;
  const total = (me.skillOffered.length + me.skillWanted.length + other.skillOffered.length + other.skillWanted.length) / 4 || 1;
  return Math.round(((offerOverlap + wantOverlap) / (total * 2)) * 100);
};

const Matches = () => {
  const [myProfile, setMyProfile] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [matches, setMatches] = useState([]);
  const [connected, setConnected] = useState(new Set());
  const [tab, setTab] = useState('discover');  // 'discover' | 'pending' | 'accepted'
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [pRes, uRes, mRes] = await Promise.all([getMyProfile(), getAllUsers(), getMatches()]);
        setMyProfile(pRes.data);
        setAllUsers(uRes.data.filter((u) => u._id !== pRes.data._id));
        setMatches(mRes.data);
      } catch (err) {
        console.error(err);
      } finally { setLoading(false); }
    };
    fetchAll();
  }, []);

  if (loading) return <div style={styles.loading}>Finding your matches...</div>;

  // Score and sort users
  const scored = allUsers
    .map((u) => ({ ...u, score: computeScore(myProfile, u) }))
    .filter((u) => u.score > 0)
    .sort((a, b) => b.score - a.score);

  const pending = matches.filter((m) => m.status === 'pending');
  const accepted = matches.filter((m) => m.status === 'accepted');

  return (
    <div className="page">
      <h1 className="page-title">Skill Matches</h1>
      <p className="page-sub">Users matched based on your skill compatibility</p>

      {/* Tabs */}
      <div style={styles.tabs}>
        {[
          { key: 'discover', label: `Discover (${scored.length})` },
          { key: 'pending', label: `Pending (${pending.length})` },
          { key: 'accepted', label: `Active (${accepted.length})` },
        ].map((t) => (
          <button key={t.key} onClick={() => setTab(t.key)}
            style={{ ...styles.tab, ...(tab === t.key ? styles.tabActive : {}) }}>
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'discover' && (
        scored.length === 0
          ? <p style={styles.empty}>No matches yet — update your profile skills to find swaps!</p>
          : <div style={styles.grid}>
            {scored.map((u) => (
              <MatchCard key={u._id} user={u} score={u.score}
                onConnect={(id) => setConnected((prev) => new Set([...prev, id]))} />
            ))}
          </div>
      )}

      {tab === 'pending' && (
        pending.length === 0
          ? <p style={styles.empty}>No pending requests.</p>
          : <div style={styles.list}>
            {pending.map((m) => (
              <div key={m._id} className="card" style={styles.matchRow}>
                <span style={{ fontWeight: 500 }}>{m.user1?.name || 'Unknown'}</span>
                <span className="badge badge-purple">Pending</span>
              </div>
            ))}
          </div>
      )}

      {tab === 'accepted' && (
        accepted.length === 0
          ? <p style={styles.empty}>No active swaps yet.</p>
          : <div style={styles.list}>
            {accepted.map((m) => (
              <div key={m._id} className="card" style={styles.matchRow}>
                <span style={{ fontWeight: 500 }}>{m.user1?.name || m.user2?.name || 'Swap Partner'}</span>
                <span className="badge badge-green">Active</span>
              </div>
            ))}
          </div>
      )}
    </div>
  );
};

const styles = {
  loading: { minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--muted)' },
  tabs: { display: 'flex', gap: '0.5rem', marginBottom: '1.75rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem' },
  tab: { background: 'transparent', border: '1px solid var(--border)', color: 'var(--muted)', padding: '0.45rem 1rem', borderRadius: 8, fontSize: '0.88rem', cursor: 'pointer', transition: 'all 0.2s' },
  tabActive: { background: 'var(--tag-bg)', color: 'var(--tag-text)', border: '1px solid rgba(108,99,255,0.4)' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.25rem' },
  list: { display: 'flex', flexDirection: 'column', gap: '0.75rem' },
  matchRow: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 1.25rem' },
  empty: { color: 'var(--muted)', textAlign: 'center', padding: '3rem 0', fontSize: '0.95rem' },
};

export default Matches;
