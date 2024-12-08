import { useState, useEffect } from 'react';
import '../styles/Form.css';

const Form = ({ data, onSave, isCardActive }) => {
  const [formData, setFormData] = useState(data || {});

  useEffect(() => {
    setFormData(data || {});
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!data) {
    return <div className="form-message">Seleccione un empleado en Card3 para editar</div>;
  }

  return (
    <form className={`edit-form ${isCardActive ? 'active' : ''}`} onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group">
          <label>ID</label>
          <input type="text" name="id" value={formData.id || ''} disabled />
        </div>
        <div className="form-group">
          <label>Nombre</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre || ''}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Profesión</label>
          <input
            type="text"
            name="profesion"
            value={formData.profesion || ''}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Departamento</label>
          <input
            type="text"
            name="departamento"
            value={formData.departamento || ''}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Proyecto</label>
          <input
            type="text"
            name="proyecto"
            value={formData.proyecto || ''}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Nivel</label>
          <select 
            name="nivel" 
            value={formData.nivel || ''} 
            onChange={handleChange}
          >
            <option value="">Seleccionar...</option>
            <option value="Junior">Junior</option>
            <option value="Mid-Senior">Mid-Senior</option>
            <option value="Senior">Senior</option>
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email || ''}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Teléfono</label>
          <input
            type="tel"
            name="telefono"
            value={formData.telefono || ''}
            onChange={handleChange}
          />
        </div>
      </div>
    </form>
  );
};

export default Form;
