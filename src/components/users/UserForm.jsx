import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import Card from '../Card';
import Button from '../Button';
import './UserForm.css';

const UserForm = ({ selectedUser, setSelectedUser, isActive, onActivate, onSave, onDelete }) => {
  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (selectedUser) {
      // Asegurarnos de copiar todos los campos del usuario seleccionado
      setFormData({
        id: selectedUser.id,
        name: selectedUser.name || '',
        email: selectedUser.email || '',
        role: selectedUser.role || 'customer',
        phone: selectedUser.phone || '',
        location: selectedUser.location || '',
        address: selectedUser.address || '',
        zip: selectedUser.zip || ''
      });
      setIsEditing(false);
    }
  }, [selectedUser]);

  const handleNew = () => {
    setFormData({
      name: '',
      email: '',
      role: 'customer',
      phone: '',
      location: '',
      address: '',
      zip: ''
    });
    setIsEditing(true);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      // Si estamos editando un usuario existente, incluir el id
      const dataToSave = selectedUser
        ? { ...formData, id: selectedUser.id }
        : formData;

      await onSave(dataToSave);
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving user:', error);
      // Aquí podrías mostrar un mensaje de error al usuario
    }
  };

  const handleClear = () => {
    setFormData({});
    setIsEditing(false);
    // Limpiar el usuario seleccionado del contexto
    setSelectedUser(null);
  };

  const handleDelete = async () => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      try {
        await onDelete(selectedUser.id);
        handleClear();
      } catch (error) {
        console.error('Error deleting user:', error);
        // Aquí podrías mostrar un mensaje de error al usuario
      }
    }
  };

  const renderHeader = () => (
    <div className="form-header">
      <h2>Detalles de Usuario</h2>
      <span className={`mode-label ${isEditing ? 'edit-mode' : 'view-mode'}`}>
        {isEditing ? 'Modo Edición' : 'Modo Vista'}
      </span>
    </div>
  );

  const renderUserDetails = () => {
    if (!selectedUser && !isEditing) {
      return <p>Selecciona un usuario para ver sus detalles o crea uno nuevo</p>;
    }

    const fields = [
      { label: 'NOMBRE', name: 'name', type: 'text' },
      { label: 'EMAIL', name: 'email', type: 'email' },
      { label: 'ROL', name: 'role', type: 'select', options: ['admin', 'supervisor', 'customer'] },
      { label: 'TELÉFONO', name: 'phone', type: 'tel' },
      { label: 'CIUDAD', name: 'location', type: 'text' },
      { label: 'DIRECCIÓN', name: 'address', type: 'text' },
      { label: 'CÓDIGO POSTAL', name: 'zip', type: 'text' }
    ];

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    };

    return (
      <div className="user-details">
        {fields.map(field => (
          <div key={field.label} className="detail-row">
            <span className="detail-label">{field.label}:</span>
            {isEditing ? (
              field.type === 'select' ? (
                <select
                  name={field.name}
                  value={formData[field.name] || ''}
                  onChange={handleInputChange}
                  className="detail-input"
                >
                  <option value="">Seleccionar...</option>
                  {field.options.map(option => (
                    <option key={option} value={option}>
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name] || ''}
                  onChange={handleInputChange}
                  className="detail-input"
                />
              )
            ) : (
              <span className="detail-value">{formData[field.name] || '-'}</span>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <Card
      id="UserForm"
      header={renderHeader()}
      body={renderUserDetails()}
      footer={
        <div className="form-footer">
          <Button
            onClick={handleNew}
            variant="primary"
            disabled={isEditing}
          >
            Nuevo
          </Button>
          <Button
            onClick={isEditing ? handleSave : handleEdit}
            variant="success"
            disabled={!selectedUser && !isEditing}
          >
            {isEditing ? 'Guardar' : 'Editar'}
          </Button>
          <Button
            onClick={handleClear}
            variant="secondary"
            disabled={!selectedUser && !isEditing}
          >
            Limpiar
          </Button>
          <Button
            onClick={handleDelete}
            variant="danger"
            disabled={!selectedUser}
          >
            Eliminar
          </Button>
        </div>
      }
      isActive={isActive}
      onActivate={onActivate}
    />
  );
};

UserForm.propTypes = {
  selectedUser: PropTypes.object,
  setSelectedUser: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  onActivate: PropTypes.func.isRequired,
  onSave: PropTypes.func,
  onDelete: PropTypes.func
};

export default UserForm;
