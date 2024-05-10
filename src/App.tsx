import { useMemo, useState } from "react";
import { QuitModal, ResultModal } from "./components/modal";
import { BoardStateType, PlayerStateType } from "./interfaces";
import { ResetButton } from "./components/button";
import { getRandomArray, getRandomInt } from "./utils";

function App() {
  const [board, setBoard] = useState<BoardStateType[]>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<PlayerStateType>("X");
  const [winner, setWinner] = useState<BoardStateType>(null);
  const [isTie, setIsTie] = useState<boolean>(false);
  const [autoPlay, setAutoPlay] = useState<boolean>(false);

  const winningCombos = useMemo(
    () => [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ],
    []
  );

  const autoSelectAction = (index: number): void => {
    const slotArr = winningCombos.reduce(
      (prev: number[], comboArr: number[]) => {
        if (comboArr.includes(index)) {
          const availableSlot = comboArr.filter((item) => board[item] === null);
          if (availableSlot.length > 0) prev = [...prev, ...availableSlot];
        }
        return prev;
      },
      []
    );
    const randomArr = getRandomArray(0, 100, getRandomInt(0, 100));
    const randomNo = getRandomInt(0, 100);
    const selectedNo = randomNo % randomArr.length;
    handleBoxClick(slotArr[selectedNo % slotArr.length], true);
  };

  const handleBoxClick = (index: number, isAuto?: boolean) => {
    if (board[index] || winner) return;
    const currentUser = !autoPlay ? currentPlayer : isAuto ? "O" : "X";
    board[index] = currentUser;
    setBoard([...board]);
    const winningCombo = winningCombos.find((comboArr) =>
      comboArr.every((indexNumber) => board[indexNumber] === currentUser)
    );

    if (winningCombo) setWinner(currentUser);
    else if (!board.includes(null)) setIsTie(true);
    else !autoPlay && setCurrentPlayer(currentPlayer === "X" ? "O" : "X");

    if (!isAuto && !winningCombo && autoPlay)
      setTimeout(() => {
        autoSelectAction(index);
      }, 300);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer("X");
    setIsTie(false);
    setWinner(null);
    setAutoPlay(false);
  };

  const handleAutoPlay = (status: boolean) => {
    resetGame();
    setAutoPlay(status);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 to-purple-700">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <div className="absolute top-4 right-4">
          <QuitModal />
        </div>
        <h1 className="text-3xl font-bold text-center mb-8">Tic-Tac-Toe</h1>
        <div className="grid grid-cols-3 gap-4">
          {board.map((value, index) => (
            <button
              key={index}
              className={`w-full h-20 font-bold text-4xl rounded-md transition-colors duration-300 ${
                value === "X"
                  ? "text-indigo-500 bg-indigo-100"
                  : value === "O"
                  ? "text-purple-500 bg-purple-100"
                  : "text-gray-400 bg-gray-100 hover:bg-gray-200"
              }`}
              onClick={() => handleBoxClick(index)}
            >
              {value}
            </button>
          ))}
        </div>

        <div className="mt-3 flex justify-end items-center gap-1 sm:gap-2">
          <span className="ml-2 text-xs text-gray-600 font-medium sm:text-sm">
            Auto play
          </span>
          <input
            type="checkbox"
            checked={autoPlay}
            onChange={(e) => handleAutoPlay(e.target.checked)}
            className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out sm:h-5 sm:w-5"
          />
          <ResetButton text="Reset" isReset={true} resetGame={resetGame} />
        </div>

        <ResultModal resetGame={resetGame} isTie={isTie} winner={winner} />
      </div>
    </div>
  );
}

export default App;
