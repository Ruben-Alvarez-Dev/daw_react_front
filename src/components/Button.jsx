import PropTypes from 'prop-types';
import '../styles/Button.css';

const deleteKeywords = ['eliminar', 'borrar', 'delete', 'remove'];

const Button = ({ children, type = "button", disabled = false, variant = "primary", onClick }) => {
  const isDeleteButton = typeof children === 'string' && deleteKeywords.includes(children.toLowerCase());
  const buttonClass = `custom-button ${disabled ? 'disable' : 'enable'} ${variant} ${isDeleteButton ? 'delete-action' : ''}`;

  return (
    <button 
      type={type}
      className={buttonClass}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  disabled: PropTypes.bool,
  variant: PropTypes.oneOf(["primary", "secondary", "success", "warning", "danger"]),
  onClick: PropTypes.func
};

export default Button;
