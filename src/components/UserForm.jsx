import { useState } from 'react';
import Card from './Card';
import Form from './Form';
import Button from './Button';
import Modal from './Modal';
import { useUser } from '../context/UserContext';
import './UserForm.css';

const UserForm = ({
  isActive, 
  onClick, 
  isModal = false,
  onClose = null
}) => {
  const { selectedUser, selectUser, clearSelectedUser } = useUser(); // Get the selectUser and clearSelectedUser functions from the UserContext

  // Inicializamos isEditing a false por defecto, o true solo si estamos en modo modal
  const [isEditing, setIsEditing] = useState(isModal);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const userFields = [
    { name: 'name', label: 'Name', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'phone', label: 'Phone', type: 'tel', required: true },
    { name: 'address', label: 'Address', type: 'text', required: true },
    { name: 'location', label: 'Location', type: 'text', required: true },
    { name: 'zip', label: 'ZIP', type: 'text', required: true },
    { 
      name: 'role', 
      label: 'Role', 
      type: 'select', 
      required: true,
      options: [
        { value: 'admin', label: 'Admin' },
        { value: 'supervisor', label: 'Supervisor' },
        { value: 'customer', label: 'Customer' }
      ]
    },
    { 
      name: 'id', 
      label: 'ID', 
      type: 'text', 
      disabled: true,
      required: false 
    }
  ];

  const handleSave = async (formElement) => {
    try {
      const formData = {};
      userFields.forEach(field => {
        formData[field.name] = formElement[field.name].value;
      });

      const isNewUser = !selectedUser?.id;
      
      // Si es un nuevo usuario, asignamos un ID temporal
      if (isNewUser) {
        formData.id = Date.now(); // Usamos timestamp como ID temporal
      }

      const url = `http://localhost:3000/users${isNewUser ? '' : '/' + selectedUser.id}`;
      const method = isNewUser ? 'POST' : 'PUT';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Error ${isNewUser ? 'creating' : 'updating'} user: ${response.statusText}`);
      }

      const updatedUser = await response.json();
      
      // Primero actualizamos el estado
      setIsEditing(false);
      
      // Limpiamos el formulario y el usuario seleccionado del contexto
      selectUser(updatedUser);
      
      if (isModal && onClose) {
        onClose();
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDelete = async () => {
    if (!selectedUser) return;
    
    try {
      const response = await fetch(`http://localhost:3000/users/${selectedUser.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Error al eliminar el usuario');
      }

      setIsDeleteModalOpen(false);
      clearSelectedUser();
      
      if (isModal && onClose) {
        onClose();
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      setIsDeleteModalOpen(false);
    }
  };

  const handleClear = () => {
    setIsEditing(false);
    clearSelectedUser();
    if (isModal && onClose) {
      onClose();
    }
  };

  const formContent = (
    <Form
      id="user-form"
      fields={userFields}
      data={selectedUser || {}}
      onSave={handleSave}
      isEditing={isEditing || isModal}
      hideButtons={true}
    />
  );

  if (isModal) {
    return (
      <Modal
        isOpen={true}
        onClose={onClose}
        text="Nuevo Usuario"
        size="large"
        onAccept={() => handleSave(document.getElementById('user-form'))}
        onCancel={onClose}
      >
        <div className="modal-form-container">
          {formContent}
        </div>
      </Modal>
    );
  }

  return (
    <>
      <Card 
        headerLeft={selectedUser?.id ? 'Edit User' : 'New User'}
        headerRight={isEditing ? 'Edit Mode' : 'View Mode'}
        bodyCenter={formContent}
        footerCenter={
          <div className="form-buttons" style={{ display: 'flex', gap: '1rem' }}>
            {!isEditing ? (
              <>
                <Button 
                  variant="success"
                  onClick={() => setIsEditing(true)}
                  disabled={!selectedUser}
                >
                  Edit
                </Button>
                <Button 
                  variant="secondary"
                  onClick={handleClear}
                  disabled={!selectedUser}
                >
                  Clear
                </Button>
                <Button 
                  variant="danger"
                  onClick={() => setIsDeleteModalOpen(true)}
                  disabled={!selectedUser || !selectedUser.id}
                >
                  Delete
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant="success"
                  type="submit"
                  form="user-form"
                >
                  Save
                </Button>
                <Button 
                  variant="secondary"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
              </>
            )}
          </div>
        }
        isActive={isActive}
        onClick={onClick}
      />

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        text={`Confirm User Deletion - ${selectedUser?.name}`}
        onAccept={handleDelete}
        onCancel={() => setIsDeleteModalOpen(false)}
        disabledAccept={!selectedUser}
      >
        <div className="delete-confirmation">
          <p>You are about to permanently delete this user from the system.</p>
          <div className="user-details">
            <p><strong>Name:</strong> {selectedUser?.name}</p>
            <p><strong>Email:</strong> {selectedUser?.email}</p>
            <p><strong>Role:</strong> {selectedUser?.role}</p>
          </div>
          <p className="warning">Warning: This action cannot be undone.</p>
        </div>
      </Modal>
    </>
  );
};

export default UserForm;
