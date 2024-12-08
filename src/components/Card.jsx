import React from 'react';
import { useCard } from '../context/CardContext';
import '../styles/Card.css';

const Card = ({ header, body, footer, id }) => {
  const { activeCard, updateActiveCard } = useCard();
  const isActive = activeCard.id === id;

  const handleClick = () => {
    if (id) {
      updateActiveCard(id, header.props.children);
    }
  };

  return (
    <div 
      className={`card ${isActive ? 'active' : ''} ${id ? 'clickable' : ''}`}
      onClick={handleClick}
    >
      <div className="card-header">{header}</div>
      <div className="card-body">{body}</div>
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  );
};

export default Card;
