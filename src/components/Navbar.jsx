import { useState, useContext } from 'react';
import Button from './Button';
import Label from './Label';
import LoginModal from './LoginModal';
import { useUser } from '../context/UserContext';
import { useCard } from '../context/CardContext';
import { AppContext } from '../context/AppContext';
import '../styles/Navbar.css';

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, login, logout } = useUser();
  const { activeCard } = useCard();
  const { selectedUser } = useContext(AppContext);

  const handleLogin = () => {
    setIsModalOpen(true);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>La Louche</h1>
      </div>
      <div className="navbar-content">
        {selectedUser && (
          <Label 
            text={selectedUser.name + " - " + selectedUser.email}
            variant="info"
          />
        )}
        {activeCard && (
          <Label 
            text={activeCard.title} 
            variant="info"
          />
        )}
        <div className="navbar-buttons">
          {user && (
            <Label 
              text={user.role}
              type={user.role.toLowerCase()}
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
      <LoginModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onLogin={login}
      />
    </nav>
  );
};

export default Navbar;
