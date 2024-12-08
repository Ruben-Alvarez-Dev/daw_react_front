import PropTypes from 'prop-types';
import Card from '../Card';

const UserForm = ({ users, isActive, onActivate, type = 'statistics' }) => {
  const getContent = () => {
    switch (type) {
      case 'statistics':
        return (
          <div>
            <p>Active users: {users?.length || 0}</p>
            <p>Admins: {users?.filter(u => u.role === 'admin').length || 0}</p>
            <p>Supervisors: {users?.filter(u => u.role === 'supervisor').length || 0}</p>
            <p>Customers: {users?.filter(u => u.role === 'customer').length || 0}</p>
          </div>
        );
      case 'activity':
        return (
          <div>
            <p>Recent logins: {users?.filter(u => u.last_login > Date.now() - 86400000).length || 0}</p>
            <p>Total visits: {users?.reduce((acc, u) => acc + (u.visits || 0), 0)}</p>
            <p>Active sessions: {users?.filter(u => u.is_online).length || 0}</p>
            <p>New users today: {users?.filter(u => new Date(u.created_at).toDateString() === new Date().toDateString()).length || 0}</p>
          </div>
        );
      default:
        return <div>Unknown type</div>;
    }
  };

  return (
    <Card
      id={type}
      header={<h2>{type === 'statistics' ? 'User Statistics' : 'User Activity'}</h2>}
      body={getContent()}
      footer={<button className="custom-button success">View Details</button>}
      isActive={isActive}
      onActivate={onActivate}
    />
  );
};

UserForm.propTypes = {
  users: PropTypes.array,
  isActive: PropTypes.bool.isRequired,
  onActivate: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['statistics', 'activity'])
};

export default UserForm;
