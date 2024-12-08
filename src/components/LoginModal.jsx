import React, { useEffect, useState } from 'react';
import { MdAdminPanelSettings, MdSupervisorAccount, MdPerson } from 'react-icons/md';
import Modal from './Modal';
import '../styles/LoginModal.css';

const LoginModal = ({ isOpen, onClose, onLogin, disabledAccept }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3000/users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    if (isOpen) {
      fetchUsers();
    }
  }, [isOpen]);

  const getIconByRole = (role) => {
    switch (role) {
      case 'admin':
        return <MdAdminPanelSettings size={24} />;
      case 'supervisor':
        return <MdSupervisorAccount size={24} />;
      case 'customer':
        return <MdPerson size={24} />;
      default:
        return null;
    }
  };

  const handleUserSelect = (user) => {
    onLogin(user);
    onClose();
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Select User"
      onAccept={disabledAccept ? () => {} : handleUserSelect} 
      onCancel={onClose} 
      disabledAccept={disabledAccept}
      children={
        <div className="login-options">
          {users.map((user) => (
            <div 
              key={user.id_user} 
              className="user-option" 
              onClick={() => handleUserSelect(user)}
            >
              <div className="user-icon">
                {getIconByRole(user.role)}
              </div>
              <div className="user-info">
                <span className="user-name">{user.name}</span>
                <span className="user-role">{user.role}</span>
              </div>
            </div>
          ))}
        </div>
      }
    />
  );
};

export default LoginModal;
