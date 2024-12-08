import PropTypes from 'prop-types';
import '../styles/Label.css';

const Label = ({ text, type = 'default', subtext }) => {
  if (!text) return null;
  
  return (
    <div className={`label ${type}`}>
      <span className="label-text">{text}</span>
      {subtext && <span className="label-subtext">{subtext}</span>}
    </div>
  );
};

Label.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string,
  subtext: PropTypes.string
};

export default Label;
