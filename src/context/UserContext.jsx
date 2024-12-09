import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const selectUser = (userData) => {
    setSelectedUser(userData);
  };

  const clearSelectedUser = () => {
    setSelectedUser(null);
  };

  return (
    <UserContext.Provider value={{ 
      user, 
      login, 
      logout, 
      selectedUser,
      selectUser,
      clearSelectedUser 
    }}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export default UserContext;
