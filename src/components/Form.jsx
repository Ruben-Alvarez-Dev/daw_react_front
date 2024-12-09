import { useEffect, useRef } from 'react';
import Button from './Button';
import './Form.css';

const Form = ({ 
  id, 
  fields, 
  data = {}, 
  onSave, 
  isEditing = false,
  hideButtons = false
}) => {
  const formRef = useRef(null);

  useEffect(() => {
    if (formRef.current) {
      fields.forEach(field => {
        const input = formRef.current[field.name];
        if (input) {
          input.value = data[field.name] || '';
        }
      });
    }
  }, [data, fields]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSave) {
      onSave(e.target);
    }
  };

  if (!fields || fields.length === 0) {
    return <div className="form-message">No fields defined</div>;
  }

  if (!data) {
    return <div className="form-message">Select a user to edit</div>;
  }

  return (
    <form id={id} ref={formRef} onSubmit={handleSubmit} className="form">
      <div className="form-grid">
        {fields.map((field, index) => (
          <div key={index} className="form-group">
            <label htmlFor={field.name} className="form-label">{field.label}</label>
            {field.type === 'select' ? (
              <select
                name={field.name}
                id={field.name}
                required={field.required}
                disabled={field.disabled || !isEditing}
                className="form-select"
              >
                <option value="">Select {field.label}</option>
                {field.options?.map((option, idx) => (
                  <option key={idx} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field.type}
                name={field.name}
                id={field.name}
                required={field.required}
                disabled={field.disabled || !isEditing}
                className="form-input"
              />
            )}
          </div>
        ))}
      </div>
      {!hideButtons && isEditing && (
        <div className="form-buttons">
          <Button type="submit" variant="success">Save</Button>
          <Button type="reset" variant="secondary">Cancel</Button>
        </div>
      )}
    </form>
  );
};

export default Form;
