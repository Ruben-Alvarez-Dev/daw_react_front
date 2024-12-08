import PropTypes from 'prop-types';
import Card from '../Card';

const UserForm = ({ isActive, onActivate }) => {
  return (
    <Card
      header={<h2>User Form</h2>}
      body={
        <div className="user-form">
          <form>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text" id="username" name="username" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" />
            </div>
            <div className="form-group">
              <label htmlFor="role">Role</label>
              <select id="role" name="role">
                <option value="admin">Admin</option>
                <option value="supervisor">Supervisor</option>
                <option value="customer">Cliente</option>
              </select>
            </div>
          </form>
        </div>
      }
      footer={
        <div className="form-actions">
          <button className="custom-button secondary">Cancel</button>
          <button className="custom-button primary">Save User</button>
        </div>
      }
      isActive={isActive}
      onActivate={onActivate}
    />
  );
};

UserForm.propTypes = {
  isActive: PropTypes.bool.isRequired,
  onActivate: PropTypes.func.isRequired
};

export default UserForm;
