import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import UserList from '../components/users/UserList';
import UserForm from '../components/users/UserForm';
import '../styles/Users.css';

const Users = () => {
  const { setSelectedUser } = useContext(AppContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [activeCard, setActiveCard] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:3001/users');
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      setUsers(data);
      setError(null);
    } catch (err) {
      setError('Error loading users');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUserSelect = (user) => {
    setSelectedUserId(user.id);
    // Guardar todos los datos del usuario
    setSelectedUser(user);
  };

  const handleActivate = (cardId) => {
    setActiveCard(activeCard === cardId ? null : cardId);
  };

  const handleSaveUser = async (userData) => {
    try {
      // Asegurarnos de que estamos usando el id correcto
      const isUpdate = Boolean(userData.id);
      
      // json-server espera la ID en la URL para PUT
      const url = isUpdate
        ? `http://localhost:3001/users/${userData.id}`  // Para actualizar: PUT /users/:id
        : 'http://localhost:3001/users';                // Para crear: POST /users
      
      console.log('Sending request to:', url);
      console.log('Request method:', isUpdate ? 'PUT' : 'POST');
      console.log('Request body:', userData);
      
      const response = await fetch(url, {
        method: isUpdate ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error('Server response:', errorData);
        throw new Error(`Failed to save user: ${response.status} ${response.statusText}`);
      }

      // Recargar la lista de usuarios
      await fetchUsers();

      // Si era una actualización, mantener el usuario seleccionado
      if (isUpdate) {
        const updatedUser = await response.json();
        setSelectedUserId(updatedUser.id);
        setSelectedUser(updatedUser);
      }
    } catch (err) {
      setError('Error saving user');
      console.error('Error:', err);
      throw err; // Re-lanzar el error para que UserForm pueda manejarlo
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      // json-server espera la ID en la URL para DELETE
      const response = await fetch(`http://localhost:3001/users/${userId}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to delete user');
      }

      // Recargar la lista de usuarios
      await fetchUsers();
      setSelectedUserId(null);
      setSelectedUser(null);
    } catch (err) {
      setError('Error deleting user');
      console.error('Error:', err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="cards-container">
      <UserList 
        users={users}
        selectedUserId={selectedUserId}
        onUserSelect={handleUserSelect}
        isActive={activeCard === 'management'}
        onActivate={() => handleActivate('management')}
      />
      <UserForm 
        selectedUser={users.find(user => user.id === selectedUserId)}
        setSelectedUser={(user) => {
          setSelectedUserId(user ? user.id : null);
          setSelectedUser(user);
        }}
        isActive={activeCard === 'UserForm'}
        onActivate={() => handleActivate('UserForm')}
        onSave={handleSaveUser}
        onDelete={handleDeleteUser}
      />
    </div>
  );
};

export default Users;
