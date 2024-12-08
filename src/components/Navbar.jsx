import { useState } from 'react';
import Button from './Button';
import Modal from './Modal';
import Label from './Label';
import { useUser } from '../context/UserContext';
import { useCard } from '../context/CardContext';
import '../styles/Navbar.css';

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, login, logout } = useUser();
  const { activeCard } = useCard();

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
        <h1>La Louche</h1>
      </div>
      <div className="navbar-content">
        {activeCard && (
          <Label 
            text={activeCard.title} 
            variant="primary"
          />
        )}
        <div className="navbar-buttons">
          {user && (
            <Label 
              text={user.role} 
              variant={getRoleVariant(user.role)} 
            />
          )}
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
