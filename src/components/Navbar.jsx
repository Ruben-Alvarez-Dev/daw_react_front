import { useState } from 'react';
import Button from './Button';
import Modal from './Modal';
import { useUser } from '../context/UserContext';
import '../styles/Navbar.css';

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, login, logout } = useUser();

  const handleLogin = () => {
    setIsModalOpen(true);
  };

  const handleUserSelect = (selectedUser) => {
    login(selectedUser);
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    logout();
  };

  const getRoleVariant = (role) => {
    switch (role) {
      case 'admin':
        return 'danger';
      case 'supervisor':
        return 'warning';
      default:
        return 'success';
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>la louche</h1>
      </div>
      <div className="navbar-content">
        {user && (
          <div className="user-info">
            <div className="user-tag">
              <span>{user.name}</span>
            </div>
            <div className="user-tag">
              <span>{user.email}</span>
            </div>
            <div className="user-tag">
              <span>{user.phone}</span>
            </div>
            <div className={`user-tag user-tag-${getRoleVariant(user.role)}`}>
              <span>{user.role}</span>
            </div>
          </div>
        )}
        <div className="navbar-buttons">
          <Button 
            text="Login" 
            variant="success" 
            onClick={handleLogin}
            status={user ? "disable" : "enable"}
          />
          <Button 
            text="Register" 
            variant="primary"
            status={user ? "disable" : "enable"}
          />
          <Button 
            text="Logout" 
            variant="danger" 
            status={user ? "enable" : "disable"}
            onClick={handleLogout}
          />
        </div>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Select User Type"
      >
        <div onClick={handleUserSelect} />
      </Modal>
    </nav>
  );
};

export default Navbar;
