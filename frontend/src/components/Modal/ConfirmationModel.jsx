import React from "react";
import Modal from "react-modal";
import "./modalStyles.css";


Modal.setAppElement("#root");

export const ConfirmationModel = ({ isOpen, onRequestClose ,name,on}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Example Modal"
      className="custom-style"
    >
      <h2>Do you want to {on===true?"off":"allow"} {name}</h2>
      <div className="modal-div">
      <button className="modal-btn">Yes</button>
      <button className="modal-btn">No</button>
      </div>
      
    </Modal>
  );
};

