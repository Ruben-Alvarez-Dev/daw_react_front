import { useState, useContext, useEffect } from 'react';
import Button from './Button';
import Label from './Label';
import Modal from './Modal';
import { MdAdminPanelSettings, MdSupervisorAccount, MdPerson } from 'react-icons/md';
import { useUser } from '../context/UserContext';
import { useCard } from '../context/CardContext';
import { AppContext } from '../context/AppContext';
import '../styles/Navbar.css';

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const { user, login, logout, users: allUsers } = useUser();
  const { activeCard } = useCard();
  const { selectedUser: contextSelectedUser } = useContext(AppContext);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3000/users');
        const data = await response.json();

        // Agregar 10 usuarios más del tipo 'customer'
        const additionalUsers = Array.from({ length: 10 }, (_, i) => ({
          id: data.length + i + 1,
          name: `Customer ${i + 1}`,
          role: 'customer',
          email: `customer${i + 1}@example.com`
        }));

        setUsers([...data, ...additionalUsers]);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    if (isModalOpen) {
      fetchUsers();
    }
  }, [isModalOpen]);

  const handleLogin = () => {
    setIsModalOpen(true);
  };

  const handleLogout = () => {
    logout();
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const handleAccept = () => {
    if (selectedUser) {
      login(selectedUser);
      setIsModalOpen(false);
    }
  };

  const getIconByRole = (role) => {
    switch (role) {
      case 'admin':
        return <MdAdminPanelSettings size={24} />;
      case 'supervisor':
        return <MdSupervisorAccount size={24} />;
      case 'customer':
        return <MdPerson size={24} />;
      default:
        return null;
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>La Louche</h1>
      </div>
      <div className="navbar-content">
        {contextSelectedUser && (
          <Label 
            text={contextSelectedUser.name + " - " + contextSelectedUser.email}
            type="info"
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
            variant="success" 
            onClick={handleLogin}
            disabled={!!user}
          >
            Login
          </Button>
          {!user && (
            <Button 
              variant="primary"
              disabled={!!user}
            >
              Register
            </Button>
          )}
          {user && (
            <Button 
              variant="warning" 
              onClick={handleLogout}
            >
              Logout
            </Button>
          )}
        </div>
      </div>
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        text="Select User"
        onAccept={handleAccept} 
        onCancel={() => setIsModalOpen(false)} 
        disabledAccept={!selectedUser}
        children={
          <div className="login-options">
            {users && users.map((user) => (
              <div 
                key={user.id} 
                className={`user-option ${selectedUser?.id === user.id ? 'selected' : ''}`} 
                onClick={() => handleUserClick(user)}
              >
                <div className="user-icon">
                  {getIconByRole(user.role)}
                </div>
                <div className="user-info">
                  <span className="user-name">{user.name}</span>
                  <span className="user-role">{user.role}</span>
                </div>
              </div>
            ))}
          </div>
        }
      />
    </nav>
  );
};

export default Navbar;
