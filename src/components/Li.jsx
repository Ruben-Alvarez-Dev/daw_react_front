import '../styles/Li.css';

const Li = ({ text, isActive, onClick }) => {
  return (
    <div 
      className={`li-item ${isActive ? 'active' : ''}`}
      onClick={onClick}
    >
      {text}
    </div>
  );
};

export default Li;
