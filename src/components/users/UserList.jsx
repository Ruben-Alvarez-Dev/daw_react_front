import PropTypes from 'prop-types';
import Card from '../Card';

const UserList = ({ users, selectedUserId, onUserSelect, isActive, onActivate }) => {
  return (
    <Card
      id="management"
      header={<h2>UserList.jsx</h2>}
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
                ))}
              </div>
            </>
          )}
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
