// ModalComponent.jsx
import React from "react";
import Modal from "react-modal";
import "./modalStyles.css";


Modal.setAppElement("#root"); // Make sure to set the root element for accessibility

export const SetpinModal = ({ isOpen, onRequestClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Example Modal"
      className="custom-style"
    >
      <h2>Set Your four digit pin</h2>
      <input className="modal-input" placeholder="Enter your PIN" type="password"/>
      <input className="modal-input" placeholder="Confirm your PIN" type="number" />
      <button className="modal-btn">Set PIN</button>
    </Modal>
  );
};

