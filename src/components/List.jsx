import React from 'react';
import '../styles/List.css';

const List = ({ items, onItemClick, selectedItem, renderItem }) => {
  return (
    <div className="list-container">
      {items.map((item) => (
        <div
          key={item.id}
          className={`list-item ${item.id === selectedItem?.id ? 'selected' : ''}`}
          onClick={() => onItemClick(item)}
        >
          {renderItem ? renderItem(item) : (
            <div className="list-item-content">
              <div className="list-item-line1">
                <span>{item.name}</span>
                <span>{item.email}</span>
                <span>{item.phone}</span>
              </div>
              <div className="list-item-line2">
                <span>{item.address}</span>
                <span>{item.location}</span>
                <span>{item.zip}</span>
                <span className={`role-badge ${item.role}`}>{item.role}</span>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default List;
