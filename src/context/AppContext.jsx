import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext debe usarse dentro de un AppContextProvider');
  }
  return context;
};

export const AppContextProvider = ({ children }) => {
  // Aquí definimos los estados globales
  const [theme, setTheme] = useState('dark');
  
  // Valores que queremos compartir en la aplicación
  const value = {
    theme,
    setTheme,
    // Aquí puedes añadir más estados y funciones según necesites
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
