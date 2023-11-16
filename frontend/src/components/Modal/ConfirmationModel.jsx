import React from "react";
import Modal from "react-modal";
import "./modalStyles.css";


Modal.setAppElement("#root");

export const ConfirmationModel = ({ isOpen, onRequestClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Example Modal"
      className="custom-style"
    >
      <h2>Do you want to {props.name}</h2>
      <button className="modal-btn">Yes</button>
      <button className="modal-btn">No</button>
    </Modal>
  );
};

