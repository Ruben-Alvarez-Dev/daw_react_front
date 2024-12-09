import { useState, useEffect } from 'react';
import Button from './Button';
import Label from './Label';
import Modal from './Modal';
import List from './List';
import { MdAdminPanelSettings, MdSupervisorAccount, MdPerson } from 'react-icons/md';
import { useUser } from '../context/UserContext';
import { useCard } from '../context/CardContext';
import '../styles/Navbar.css';

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const { user, login, logout, selectedUser: activeUser } = useUser();
  const { activeCard } = useCard();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3000/users');
        const data = await response.json();
        setUsers(data);
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

  const handleAccept = () => {
    if (selectedUser) {
      login(selectedUser);
      setIsModalOpen(false);
    }
  };

  const renderUserItem = (item) => (
    <div className="user-item">
      <div className="user-icon">
        {item.role === 'admin' && <MdAdminPanelSettings size={24} />}
        {item.role === 'supervisor' && <MdSupervisorAccount size={24} />}
        {item.role === 'customer' && <MdPerson size={24} />}
      </div>
      <div className="user-info">
        <span className="user-name">{item.name}</span>
        <span className="user-role">{item.role}</span>
      </div>
    </div>
  );

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>La Louche</h1>
      </div>
      <div className="navbar-content">
        <div className="navbar-buttons">
          {!user ? (
            <>
              <Button 
                variant="success" 
                onClick={handleLogin}
              >
                Login
              </Button>
              <Button 
                variant="primary"
              >
                Register
              </Button>
            </>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              {activeUser && (
                <Label 
                  text={`${activeUser.name} - ${activeUser.email}`}
                  type="info"
                />
              )}
              <Label 
                text={user.role}
                type={user.role.toLowerCase()}
              />
              <Button 
                variant="danger" 
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
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
      >
        <div className="login-modal-content">
          <List
            items={users}
            selectedItem={selectedUser}
            onItemClick={setSelectedUser}
            renderItem={renderUserItem}
          />
        </div>
      </Modal>
    </nav>
  );
};

export default Navbar;
