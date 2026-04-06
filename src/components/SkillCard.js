// src/components/SkillCard.js
import React from 'react';

const SkillCard = ({ skill, type = 'offer' }) => {
  const isOffer = type === 'offer';
  return (
    <span
      className={isOffer ? 'badge badge-purple' : 'badge badge-green'}
      style={{ margin: '0.2rem', display: 'inline-block' }}
    >
      {isOffer ? '⬆' : '⬇'} {skill}
    </span>
  );
};

export default SkillCard;
