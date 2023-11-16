// ModalComponent.jsx
import React from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root"); // Make sure to set the root element for accessibility

const ModalComponent = ({ isOpen, onRequestClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <h2>Modal Title</h2>
      <p>This is a paragraph inside the modal.</p>
      <label>
        Number Input:
        <input type="number" />
      </label>
    </Modal>
  );
};

export default ModalComponent;
