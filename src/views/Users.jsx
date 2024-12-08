import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import UserList from '../components/users/UserList';
import UserForm from '../components/users/UserForm';
import '../styles/Users.css';

const Users = () => {
  const { setSelectedUser } = useContext(AppContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [activeCard, setActiveCard] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3000/users');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data);
        setError(null);
      } catch (err) {
        setError('Error loading users');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleUserSelect = (user) => {
    setSelectedUserId(user.id_user);
    setSelectedUser({
      name: user.name,
      email: user.email
    });
  };

  const handleActivate = (cardId) => {
    setActiveCard(activeCard === cardId ? null : cardId);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="cards-container">
      <UserList 
        users={users}
        selectedUserId={selectedUserId}
        onUserSelect={handleUserSelect}
        isActive={activeCard === 'management'}
        onActivate={() => handleActivate('management')}
      />
      <UserForm 
        users={users}
        isActive={activeCard === 'statistics'}
        onActivate={() => handleActivate('statistics')}
        type="statistics"
      />
      <UserForm 
        users={users}
        isActive={activeCard === 'activity'}
        onActivate={() => handleActivate('activity')}
        type="activity"
      />
    </div>
  );
};

export default Users;
