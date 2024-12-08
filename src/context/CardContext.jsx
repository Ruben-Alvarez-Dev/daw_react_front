import { createContext, useContext, useState } from 'react';

const CardContext = createContext();

export const CardProvider = ({ children }) => {
  const [activeCard, setActiveCard] = useState({
    id: null,
    title: null
  });

  const updateActiveCard = (id, title) => {
    setActiveCard({ id, title });
  };

  return (
    <CardContext.Provider value={{ activeCard, updateActiveCard }}>
      {children}
    </CardContext.Provider>
  );
};

export const useCard = () => {
  const context = useContext(CardContext);
  if (!context) {
    throw new Error('useCard must be used within a CardProvider');
  }
  return context;
};
