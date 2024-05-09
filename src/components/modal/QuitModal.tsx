import { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    padding: "2rem",
    borderRadius: "0.5rem",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)",
  },
};

const QuitModal = () => {
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);

  const handleModal = () => {
    setIsOpen((IsOpen) => !IsOpen);
  };

  const handleClick = () => {
    window.history.back();
  };

  return (
    <div>
      <button
        className="px-6 py-3 font-semibold bg-red-500 text-white rounded-md shadow-md hover:bg-red-600 transition-colors duration-300"
        onClick={handleModal}
      >
        Quit
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleModal}
        style={customStyles}
        contentLabel="MODAL"
      >
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Are you sure?</h2>
          <p className="text-gray-700 mb-6">
            Do you really want to quit the game?
          </p>
          <div className="flex justify-center space-x-4">
            <button
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-300"
              onClick={handleClick}
            >
              Yes
            </button>
            <button
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors duration-300"
              onClick={handleModal}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default QuitModal;
