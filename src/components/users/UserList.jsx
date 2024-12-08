import PropTypes from 'prop-types';
import { useState, useCallback } from 'react';
import Card from '../Card';

const roleColors = {
  admin: 'var(--admin-color)',
  supervisor: 'var(--supervisor-color)',
  customer: 'var(--customer-color)'
};

const UserList = ({ users, selectedUserId, onUserSelect, isActive, onActivate }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = useCallback(() => {
    if (!searchTerm) return users;
    const searchTermLower = searchTerm.toLowerCase();
    return users.filter(user => 
      user.name.toLowerCase().includes(searchTermLower) ||
      user.email.toLowerCase().includes(searchTermLower) ||
      user.phone.toLowerCase().includes(searchTermLower)
    );
  }, [users, searchTerm]);

  return (
    <Card
      id="management"
      header={<h2>UserList.jsx</h2>}
      body={
        <div className="user-list-container">
          <div className="user-list-header">
            <div className="search-container">
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
            <div className="total-users">
              Total users: {filteredUsers().length}
              {searchTerm && filteredUsers().length !== users.length && ` (filtered from ${users.length})`}
            </div>
          </div>
          <div className="users-list">
            {filteredUsers().length === 0 ? (
              <p>No users found</p>
            ) : (
              filteredUsers().map(user => (
                <div 
                  key={user.id_user} 
                  className={`user-item ${selectedUserId === user.id_user ? 'selected' : ''}`}
                  onClick={() => onUserSelect(user)}
                >
                  <div className="user-info-row">
                    <div className="user-name">{user.name}</div>
                    <div className="user-email">{user.email}</div>
                    <div className="user-phone">{user.phone}</div>
                    <div className={`user-role ${user.role}`}>{user.role}</div>
                  </div>
                  <div className="user-details-row">
                    <div className="user-id">ID: #{user.id_user}</div>
                    <div className="user-visits">Visits: {user.counter}</div>
                    <div className="user-location">{user.location}</div>
                    <div className="user-address">{user.address}</div>
                    <div className="user-zip">ZIP: {user.zip}</div>
                    {user.isVip && <div className="vip-badge">VIP</div>}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      }
      footer={<button className="custom-button primary">Add User</button>}
      isActive={isActive}
      onActivate={onActivate}
    />
  );
};

UserList.propTypes = {
  users: PropTypes.array.isRequired,
  selectedUserId: PropTypes.number,
  onUserSelect: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  onActivate: PropTypes.func.isRequired
};

export default UserList;
