import React from 'react';
import Button from './Button';
import './Modal.css';

const Modal = ({
  isOpen,
  onClose,
  text,
  children,
  onAccept,
  onCancel,
  acceptText = 'Aceptar',
  cancelText = 'Cancelar',
  showButtons = true,
  disabledAccept = false,
  size = 'medium',
  className = ''
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className={`modal-content modal-${size} ${className}`}
        onClick={e => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2>{text}</h2>
          <button className="modal-close" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          {children}
        </div>
        {showButtons && (
          <div className="modal-footer">
            {onAccept && (
              <Button
                variant="success"
                onClick={onAccept}
                disabled={disabledAccept}
              >
                {acceptText}
              </Button>
            )}
            {onCancel && (
              <Button
                variant="secondary"
                onClick={onCancel}
              >
                {cancelText}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
