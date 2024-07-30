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

const ProductShowModal = ({ modalIsOpen, setIsOpenModal, children }) => {
  function closeModal() {
    setIsOpenModal(false);
  }

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="relative">
          <button
            onClick={closeModal}
            className="absolute top-0 right-0 text-red-500"
          >
            X
          </button>

          {children}
        </div>
      </Modal>
    </>
  );
};

export default ProductShowModal;
