import PropTypes from 'prop-types';
import '../styles/Button.css';

const Button = ({ text, type = "button", status = "enable", variant = "primary", onClick }) => {
  return (
    <button 
      type={type}
      className={`custom-button ${status} ${variant}`}
      disabled={status === "disable"}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  status: PropTypes.oneOf(["enable", "disable"]),
  variant: PropTypes.oneOf(["primary", "secondary", "success", "warning", "danger"]),
  onClick: PropTypes.func
};

export default Button;
