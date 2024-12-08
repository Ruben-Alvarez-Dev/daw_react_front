import '../styles/List.css';

const List = ({ items, activeItem, onItemClick, isCardActive }) => {
  return (
    <div className="list-container">
      {items.map((item, index) => (
        <div 
          key={index}
          className={`list-item ${index === activeItem ? 'active' : ''} ${isCardActive ? 'card-active' : 'card-inactive'}`}
          onClick={() => onItemClick(index)}
        >
          {isCardActive ? (
            // Layout tabulado para card activo
            <div className="list-item-content">
              <div className="list-item-row">
                <span className="list-item-field">{item.id}</span>
                <span className="list-item-field">{item.nombre}</span>
                <span className="list-item-field">{item.edad}</span>
                <span className="list-item-field">{item.profesion}</span>
                <span className="list-item-field">{item.departamento}</span>
              </div>
              <div className="list-item-row">
                <span className="list-item-field">{item.proyecto}</span>
                <span className="list-item-field">{item.nivel}</span>
                <span className="list-item-field">{item.ubicacion}</span>
                <span className="list-item-field">{item.email}</span>
                <span className="list-item-field">{item.telefono}</span>
              </div>
            </div>
          ) : (
            // Layout flexible para card inactivo
            <div className="list-item-content">
              <span className="list-item-field">{item.id}</span>
              <span className="list-item-field">{item.nombre}</span>
              <span className="list-item-field">{item.edad}</span>
              <span className="list-item-field">{item.profesion}</span>
              <span className="list-item-field">{item.departamento}</span>
              <span className="list-item-field">{item.proyecto}</span>
              <span className="list-item-field">{item.nivel}</span>
              <span className="list-item-field">{item.ubicacion}</span>
              <span className="list-item-field">{item.email}</span>
              <span className="list-item-field">{item.telefono}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default List;
