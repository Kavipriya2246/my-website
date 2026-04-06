// src/components/MatchCard.js
import React from 'react';
import SkillCard from './SkillCard';
import { sendMatchRequest } from '../services/api';

const MatchCard = ({ user, score, onConnect }) => {
  const handleConnect = async () => {
    try {
      await sendMatchRequest(user._id);
      alert(`Match request sent to ${user.name}!`);
      if (onConnect) onConnect(user._id);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to send request');
    }
  };

  const initials = user.name
    ? user.name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2)
    : '??';

  return (
    <div className="card" style={styles.card}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.avatar}>{initials}</div>
        <div>
          <div style={styles.name}>{user.name}</div>
          <div style={styles.level}>Level: {user.level || 'Beginner'}</div>
        </div>
        {score !== undefined && (
          <div style={styles.score}>
            <div style={styles.scoreNum}>{score}%</div>
            <div style={styles.scoreLabel}>Match</div>
          </div>
        )}
      </div>

      {/* Skills */}
      <div style={{ marginBottom: '0.75rem' }}>
        <div style={styles.skillLabel}>Offers</div>
        <div>
          {(user.skillOffered || []).map((s) => <SkillCard key={s} skill={s} type="offer" />)}
        </div>
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <div style={styles.skillLabel}>Wants</div>
        <div>
          {(user.skillWanted || []).map((s) => <SkillCard key={s} skill={s} type="want" />)}
        </div>
      </div>

      <button className="btn-primary" style={{ width: '100%' }} onClick={handleConnect}>
        Connect →
      </button>
    </div>
  );
};

const styles = {
  card: { display: 'flex', flexDirection: 'column' },
  header: { display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' },
  avatar: {
    width: 48, height: 48, borderRadius: '50%',
    background: 'var(--tag-bg)', color: 'var(--tag-text)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '1rem', flexShrink: 0,
  },
  name: { fontWeight: 500, fontSize: '0.95rem' },
  level: { fontSize: '0.78rem', color: 'var(--muted)' },
  score: {
    marginLeft: 'auto', textAlign: 'center',
    background: 'rgba(0,212,170,0.1)', border: '1px solid rgba(0,212,170,0.25)',
    borderRadius: 10, padding: '0.3rem 0.7rem',
  },
  scoreNum: { fontFamily: "'Syne', sans-serif", fontWeight: 700, color: '#6eecd8', fontSize: '1rem' },
  scoreLabel: { fontSize: '0.65rem', color: 'var(--muted)', textTransform: 'uppercase' },
  skillLabel: { fontSize: '0.72rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.35rem' },
};

export default MatchCard;
