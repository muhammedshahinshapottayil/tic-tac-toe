import { ChangeEvent, useMemo, useState } from "react";
import { QuitModal, ResultModal } from "./components/modal";
import { BoardStateType, PlayerStateType } from "./interfaces";
import { ResetButton } from "./components/button";
import { getRandomArray, getRandomInt } from "./utils";

function App() {
  enum Level {
    easy = "easy",
    intermediate = "intermediate",
  }
  const [board, setBoard] = useState<BoardStateType[]>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<PlayerStateType>("X");
  const [winner, setWinner] = useState<BoardStateType>(null);
  const [isTie, setIsTie] = useState<boolean>(false);
  const [autoPlay, setAutoPlay] = useState<boolean>(false);
  const [difficulty, setDifficulty] = useState<Level>(Level.easy);

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
    const slotArrays = winningCombos.reduce(
      (prev: number[][], comboArr: number[]) => {
        if (comboArr.includes(index)) {
          const availableSlot = comboArr.filter((item) => board[item] === null);
          if (availableSlot.length > 0) prev.push(availableSlot);
        }
        return prev;
      },
      []
    );

    const slotArr =
      slotArrays.length > 0
        ? difficulty === Level.intermediate
          ? slotArrays.sort((a, b) => a.length - b.length)[0]
          : slotArrays.flat()
        : [];

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
    setDifficulty(Level.easy);
  };

  const handleAutoPlay = (status: boolean) => {
    resetGame();
    setAutoPlay(status);
  };
  const handleDifficultyChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setDifficulty(
      e.target.value === Level.easy ? e.target.value : Level.intermediate
    );
    setBoard(Array(9).fill(null));
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

        <div className="mt-3 flex flex-col justify-end items-end gap-2 sm:flex-row sm:items-center sm:gap-4">
          {autoPlay ? (
            <select
              onChange={handleDifficultyChange}
              value={difficulty}
              className="form-select w-full sm:w-auto pl-3 pr-6 py-1.5 text-sm font-medium text-gray-700 bg-white bg-opacity-50 rounded-md border border-gray-300 transition ease-in-out focus:bg-white focus:border-blue-600 focus:outline-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor'%3E%3Cpath fill-rule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clip-rule='evenodd'/%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 0.5rem center",
                backgroundSize: "1em 1em",
                appearance: "none",
              }}
            >
              <option value={Level.easy}>Easy</option>
              <option value={Level.intermediate}>Intermediate</option>
            </select>
          ) : (
            ""
          )}
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-600 font-medium sm:text-sm">
              Auto
            </span>
            <input
              type="checkbox"
              checked={autoPlay}
              onChange={(e) => handleAutoPlay(e.target.checked)}
              className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out sm:h-5 sm:w-5"
            />
          </div>

          <ResetButton text="Reset" isReset={true} resetGame={resetGame} />
        </div>

        <ResultModal resetGame={resetGame} isTie={isTie} winner={winner} />
      </div>
    </div>
  );
}

export default App;
