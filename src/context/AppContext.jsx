import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <AppContext.Provider value={{ selectedUser, setSelectedUser }}>
      {children}
    </AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default AppContext;
