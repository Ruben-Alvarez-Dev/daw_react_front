import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const CardContext = createContext();

export const CardProvider = ({ children }) => {
  const [activeCard, setActiveCard] = useState(null);

  return (
    <CardContext.Provider value={{ activeCard, setActiveCard }}>
      {children}
    </CardContext.Provider>
  );
};

CardProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export const useCard = () => {
  const context = useContext(CardContext);
  if (!context) {
    throw new Error('useCard must be used within a CardProvider');
  }
  return context;
};

export default CardContext;
