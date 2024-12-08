import { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/Card.css';

const Card = ({ header, body, footer, isActive, onActivate }) => {
  const handleClick = (e) => {
    if (!isActive) {
      e.preventDefault();
      e.stopPropagation();
      onActivate();
    }
  };

  return (
    <div 
      className={`card ${isActive ? 'active' : ''}`}
      onClick={handleClick}
    >
      <div className="card-header">{header}</div>
      <div className="card-body">{body}</div>
      <div className="card-footer">{footer}</div>
    </div>
  );
};

Card.propTypes = {
  header: PropTypes.node,
  body: PropTypes.node,
  footer: PropTypes.node,
  isActive: PropTypes.bool,
  onActivate: PropTypes.func
};

export default Card;
