import React from 'react';
import Button from './Button';
import '../styles/Modal.css';

const Modal = ({ isOpen, onClose, title, children, onAccept, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Selecciona un usuario</h2>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          {children}
        </div>
        <div className="modal-footer">
          <Button variant="success" onClick={onAccept}>Aceptar</Button>
          <Button variant="secondary" onClick={onCancel}>Cancelar</Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
