import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import Card from '../components/Card';
import '../styles/Users.css';

const Users = () => {
  const { setSelectedUser } = useContext(AppContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="cards-container">
      <Card
        id="management"
        header={<h2>User Management</h2>}
        body={
          <div>
            {users.length === 0 ? (
              <p>No users found</p>
            ) : (
              <>
                <p>Total users: {users.length}</p>
                <div className="users-list">
                  {users.map(user => (
                    <div 
                      key={user.id_user} 
                      className={`user-item ${selectedUserId === user.id_user ? 'selected' : ''}`}
                      onClick={() => handleUserSelect(user)}
                    >
                      <div className="user-main-info">
                        <span className="user-name">{user.name}</span>
                        <span className="user-email">{user.email}</span>
                        <span className="user-phone">📱 {user.phone}</span>
                        <span className={`user-role ${user.role}`}>{user.role}</span>
                      </div>
                      <div className="user-details">
                        <span>ID: #{user.id_user}</span>
                        <span className="user-counter">Visits: {user.counter}</span>
                        <span>📍 {user.location}</span>
                        <span>{user.address}</span>
                        <span>ZIP: {user.zip}</span>
                        {user.isVip && <span className="vip-badge">VIP</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        }
        footer={<button className="custom-button primary">Add User</button>}
      />

      <Card
        id="statistics"
        header={<h2>User Statistics</h2>}
        body={
          <div>
            <p>Active users: {users.length}</p>
            <p>Admins: {users.filter(u => u.role === 'admin').length}</p>
            <p>Supervisors: {users.filter(u => u.role === 'supervisor').length}</p>
            <p>Customers: {users.filter(u => u.role === 'customer').length}</p>
          </div>
        }
        footer={<button className="custom-button success">View Details</button>}
      />

      <Card
        id="activity"
        header={<h2>User Activity</h2>}
        body={
          <div>
            <p>Recent Actions:</p>
            <p>• New login: Admin (2min ago)</p>
            <p>• Profile updated: John (5min ago)</p>
            <p>• Password changed: Sarah (10min ago)</p>
            <p>• Role updated: Mike (15min ago)</p>
          </div>
        }
        footer={<button className="custom-button warning">View All Activity</button>}
      />
    </div>
  );
};

export default Users;
