import React, { useState, useCallback, useEffect } from 'react';
import UserList from '../components/UserList';
import UserForm from '../components/UserForm';
import '../styles/Views.css';

const UsersView = () => {
  const [activeCard, setActiveCard] = useState('list');
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:3000/users');
      if (!response.ok) {
        throw new Error('Error fetching users');
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error loading users:', error);
    }
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setActiveCard('form');
  };

  const handleNewUser = () => {
    setSelectedUser({
      name: '',
      email: '',
      phone: '',
      address: '',
      location: '',
      zip: '',
      role: ''
    });
    setShowModal(true);
  };

  const handleUserUpdate = useCallback(async (updatedUser) => {
    if (updatedUser === null) {
      setSelectedUser(null);
      setActiveCard('list');
      setShowModal(false);
      await fetchUsers();
    } else {
      setSelectedUser(updatedUser);
      await fetchUsers();
    }
  }, []);

  return (
    <div className="users-view">
      <div className="users-content">
        <UserList
          isActive={activeCard === 'list'}
          onClick={() => setActiveCard('list')}
          onUserSelect={handleUserSelect}
          onNewUser={handleNewUser}
          users={users}
        />
        {!showModal && (
          <UserForm
            isActive={activeCard === 'form'}
            onClick={() => setActiveCard('form')}
            selectedUser={selectedUser}
            onUserUpdate={handleUserUpdate}
          />
        )}
        {showModal && (
          <UserForm
            selectedUser={selectedUser}
            onUserUpdate={handleUserUpdate}
            isModal={true}
            onClose={() => {
              setShowModal(false);
              setSelectedUser(null);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default UsersView;
