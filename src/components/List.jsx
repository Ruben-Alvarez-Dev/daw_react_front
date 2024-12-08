import PropTypes from 'prop-types';
import '../styles/List.css';

const List = ({ items, renderItem, keyExtractor }) => {
  return (
    <div className="list">
      {items.map((item, index) => (
        <div key={keyExtractor(item, index)} className="list-item">
          {renderItem(item)}
        </div>
      ))}
    </div>
  );
};

List.propTypes = {
  items: PropTypes.array.isRequired,
  renderItem: PropTypes.func.isRequired,
  keyExtractor: PropTypes.func
};

List.defaultProps = {
  keyExtractor: (item, index) => index
};

export default List;
