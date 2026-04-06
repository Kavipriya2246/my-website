// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

const skills = ['Python', 'Figma', 'Music', 'Photography', 'React', 'Spanish', 'Excel', 'Cooking', 'Editing'];

const Home = () => (
  <div>
    {/* HERO */}
    <section style={styles.hero}>
      <div style={styles.heroInner}>
        <span className="badge badge-purple" style={{ marginBottom: '1.5rem', display: 'inline-block', textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '0.75rem' }}>
          🎓 Academic Project – Web Development
        </span>
        <h1 style={styles.h1}>
          Exchange Skills,<br />
          <span style={{ color: 'var(--accent)' }}>Not Money</span>
        </h1>
        <p style={styles.sub}>
          A peer-to-peer platform that intelligently matches users based on the skills they offer and the skills they need. Learn anything — teach what you know.
        </p>
        <div style={styles.btns}>
          <Link to="/register"><button className="btn-primary">Get Started Free</button></Link>
          <Link to="/login"><button className="btn-outline">Sign In</button></Link>
        </div>

        {/* Skill chips */}
        <div style={styles.chips}>
          {skills.map((s, i) => (
            <span key={s} className="badge" style={{
              ...styles.chip,
              background: i % 3 === 0 ? 'var(--tag-bg)' : i % 3 === 1 ? 'rgba(0,212,170,0.08)' : 'rgba(255,107,107,0.08)',
              color: i % 3 === 0 ? 'var(--tag-text)' : i % 3 === 1 ? '#6eecd8' : '#ffaaaa',
              border: `1px solid ${i % 3 === 0 ? 'rgba(108,99,255,0.3)' : i % 3 === 1 ? 'rgba(0,212,170,0.25)' : 'rgba(255,107,107,0.25)'}`,
            }}>{s}</span>
          ))}
        </div>
      </div>
    </section>

    {/* HOW IT WORKS */}
    <section style={styles.section}>
      <div style={styles.sectionInner}>
        <p style={styles.sectionLabel}>How It Works</p>
        <h2 style={styles.h2}>Four simple steps</h2>
        <div style={styles.steps}>
          {[
            { n: '1', title: 'Register', desc: 'Create your account and list what you can teach and what you want to learn.' },
            { n: '2', title: 'Get Matched', desc: 'Our algorithm finds your best-fit swap partners based on skill compatibility.' },
            { n: '3', title: 'Connect', desc: 'Send a request, chat, and schedule your skill exchange session.' },
            { n: '4', title: 'Swap & Review', desc: 'Exchange skills, then rate each other to build community trust.' },
          ].map((s) => (
            <div key={s.n} style={styles.step}>
              <div style={styles.stepNum}>{s.n}</div>
              <div style={styles.stepTitle}>{s.title}</div>
              <p style={styles.stepDesc}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section style={{ ...styles.section, textAlign: 'center', borderTop: '1px solid var(--border)' }}>
      <h2 style={{ ...styles.h2, marginBottom: '0.75rem' }}>Ready to start swapping?</h2>
      <p style={{ color: 'var(--muted)', marginBottom: '1.75rem' }}>Join the community. Learn something new today.</p>
      <Link to="/register"><button className="btn-primary">Create Your Account →</button></Link>
    </section>
  </div>
);

const styles = {
  hero: { minHeight: '88vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '5rem 5% 3rem', textAlign: 'center' },
  heroInner: { maxWidth: 680, width: '100%' },
  h1: { fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', lineHeight: 1.1, marginBottom: '1.2rem' },
  sub: { color: 'var(--muted)', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '2rem', maxWidth: 520, margin: '0 auto 2rem' },
  btns: { display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '2.5rem', flexWrap: 'wrap' },
  chips: { display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center' },
  chip: { fontSize: '0.82rem', padding: '0.35rem 0.9rem', borderRadius: 50 },
  section: { padding: '4.5rem 5%', background: 'var(--surface)' },
  sectionInner: { maxWidth: 1000, margin: '0 auto', textAlign: 'center' },
  sectionLabel: { fontSize: '0.78rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' },
  h2: { fontFamily: "'Syne', sans-serif", fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', marginBottom: '2.5rem' },
  steps: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '1.5rem', marginTop: '2rem' },
  step: { textAlign: 'center', padding: '1.5rem 1rem', background: 'var(--surface2)', borderRadius: 14, border: '1px solid var(--border)' },
  stepNum: { width: 44, height: 44, borderRadius: '50%', background: 'var(--tag-bg)', color: 'var(--accent)', fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.75rem' },
  stepTitle: { fontWeight: 600, marginBottom: '0.4rem' },
  stepDesc: { color: 'var(--muted)', fontSize: '0.85rem', lineHeight: 1.65 },
};

export default Home;
