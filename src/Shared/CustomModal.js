import React from "react";
import Modal from "react-modal";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    maxWidth: "100%",
    maxHeight: "80%",
    minWidth: "320px",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
const CustomModal = ({ children, modalIsOpen, setIsOpen }) => {
  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        ariaHideApp={false}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button
          className="fixed top-1 right-1 text-red-600 hover:text-white hover:bg-red-600 p-2 rounded-full w-6 h-6 flex justify-center items-center duration-150"
          onClick={closeModal}
        >
          X
        </button>
        {children}
      </Modal>
    </>
  );
};

export default CustomModal;
