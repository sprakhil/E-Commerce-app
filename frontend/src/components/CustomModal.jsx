import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const CustomModal = ({ show, handleClose, handleConfirm, title, children, confirmText = 'Confirm', showConfirmButton = true }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        {showConfirmButton && (
          <Button variant="primary" onClick={handleConfirm}>
            {confirmText}
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default CustomModal;