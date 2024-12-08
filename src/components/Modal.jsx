import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { MdClose, MdAdminPanelSettings, MdSupervisorAccount, MdPerson } from 'react-icons/md';
import '../styles/Modal.css';
import { getUsers } from '../services/api';

const Modal = ({ isOpen, onClose, title, children }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        // Solo tomamos los primeros 3 usuarios que corresponden a los roles principales
        setUsers(data.slice(0, 3));
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    if (isOpen) {
      fetchUsers();
    }
  }, [isOpen]);

  if (!isOpen) return null;

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
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="close-button" onClick={onClose}>
            <MdClose size={18} />
          </button>
        </div>
        <div className="modal-body">
          {users.map((user) => (
            <div key={user.id_user} className="user-option" onClick={() => children.props.onClick(user)}>
              {getIconByRole(user.role)}
              <span>{user.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node
};

export default Modal;
