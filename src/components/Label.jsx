import PropTypes from 'prop-types';
import '../styles/Label.css';

const Label = ({ text, variant = 'default' }) => {
  return (
    <div className={`label label-${variant}`}>
      <span>{text}</span>
    </div>
  );
};

Label.propTypes = {
  text: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['default', 'primary', 'success', 'warning', 'danger'])
};

export default Label;
