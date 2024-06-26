import Modal from "react-modal";
import QuitModal from "./QuitModal";
import { ResultModalProps } from "../../interfaces";
import { ResetButton } from "../button";

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

const ResultModal = ({ winner, restartGame, isTie }: ResultModalProps) => {
  return (
    <Modal
      isOpen={winner !== null ? true : isTie}
      style={customStyles}
      contentLabel="MODAL"
    >
      <div className="mt-8 text-center">
        <p className="text-2xl font-bold mb-4">
          {isTie ? "It's a tie!" : `Player ${winner} wins!`}
        </p>
        {!isTie && (
          <p className="text-2xl font-semibold mb-4">
            {winner !== null ? `Congratulations` : ""}
          </p>
        )}
        <div className="flex justify-center space-x-4">
          <ResetButton
            isReset={false}
            handleClick={restartGame}
            text="Play Again"
          />

          <QuitModal />
        </div>
      </div>
    </Modal>
  );
};

export default ResultModal;
