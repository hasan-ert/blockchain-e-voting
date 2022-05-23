import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

export default function ConfirmModal({ show, handleModalOpen, handleConfirm }) {
  const handleClose = (e) => {
    handleModalOpen(false);
    handleConfirm(e);
  };
  const handleShow = () => {
    handleModalOpen(true);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure to confirm this operation?</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => handleClose(false)}>
            Close
          </Button>
          <Button variant="success" onClick={() => handleClose(true)}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
