// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.logo}>
        <span style={{ color: 'var(--accent)' }}>Skill</span>Swap
      </Link>

      {token ? (
        <div style={styles.right}>
          <NavLink to="/dashboard" active={isActive('/dashboard')}>Dashboard</NavLink>
          <NavLink to="/matches" active={isActive('/matches')}>Matches</NavLink>
          <NavLink to="/profile" active={isActive('/profile')}>Profile</NavLink>
          <span style={styles.username}>👋 {user.name || 'User'}</span>
          <button className="btn-outline" style={{ padding: '0.45rem 1rem', fontSize: '0.85rem' }} onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <div style={styles.right}>
          <NavLink to="/login" active={isActive('/login')}>Login</NavLink>
          <Link to="/register">
            <button className="btn-primary" style={{ padding: '0.5rem 1.2rem', fontSize: '0.88rem' }}>
              Get Started
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
};

const NavLink = ({ to, active, children }) => (
  <Link to={to} style={{ ...styles.link, ...(active ? styles.linkActive : {}) }}>
    {children}
  </Link>
);

const styles = {
  nav: {
    position: 'sticky', top: 0, zIndex: 100,
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '0.9rem 5%',
    background: 'rgba(12,14,26,0.9)',
    backdropFilter: 'blur(12px)',
    borderBottom: '1px solid var(--border)',
  },
  logo: {
    fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: '1.3rem',
    color: 'var(--text)', textDecoration: 'none',
  },
  right: { display: 'flex', alignItems: 'center', gap: '1.25rem' },
  link: { color: 'var(--muted)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' },
  linkActive: { color: 'var(--text)', fontWeight: 500 },
  username: { color: 'var(--muted)', fontSize: '0.85rem' },
};

export default Navbar;
