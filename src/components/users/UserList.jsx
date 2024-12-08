import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import Card from '../Card';
import List from '../List';
import Label from '../Label';
import '../../styles/users/UserList.css';

const UserList = ({ isActive, onActivate }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await fetch('http://localhost:3000/users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error loading users:', error);
        // Datos de ejemplo en caso de error
        setUsers([
          {
            id_user: 1,
            name: "Admin User",
            email: "admin@email.com",
            role: "admin",
            phone: "666111111",
            location: "Madrid"
          },
          {
            id_user: 2,
            name: "Supervisor User",
            email: "supervisor@email.com",
            role: "supervisor",
            phone: "666222222",
            location: "Barcelona"
          },
          {
            id_user: 3,
            name: "Customer User",
            email: "customer@email.com",
            role: "customer",
            phone: "666333333",
            location: "Valencia"
          }
        ]);
      }
    };

    loadUsers();
  }, []);

  const renderUser = (user) => (
    <div className="user-item">
      <div className="user-info">
        <div className="user-main-info">
          <span className="user-name">{user.name}</span>
          <Label text={user.role} type={user.role.toLowerCase()} />
        </div>
        <div className="user-details">
          <span className="user-email">{user.email}</span>
          <span className="user-location">📍 {user.location}</span>
          <span className="user-phone">📱 {user.phone}</span>
        </div>
      </div>
    </div>
  );

  return (
    <Card
      header={<h2>User List</h2>}
      body={
        <div className="user-list">
          <div className="user-list-header">
            <p>Total users: {users.length}</p>
            <div className="user-filters">
              {/* Aquí irán los filtros */}
            </div>
          </div>
          <List
            items={users}
            renderItem={renderUser}
            keyExtractor={user => user.id_user}
          />
        </div>
      }
      footer={<button className="custom-button primary">Add New User</button>}
      isActive={isActive}
      onActivate={onActivate}
    />
  );
};

UserList.propTypes = {
  isActive: PropTypes.bool.isRequired,
  onActivate: PropTypes.func.isRequired
};

export default UserList;
