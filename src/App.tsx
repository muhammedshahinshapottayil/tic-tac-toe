import { useMemo, useState } from "react";

function App() {
  const [board, setBoard] = useState<BoardStateType[]>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<PlayerStateType>("X");
  const [winner, setWinner] = useState<BoardStateType>(null);
  const [playersName, setPlayersName] = useState<PlayersNameStateType>(null);

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

  const handleClick = (index: number) => {
    if (board[index] || winner) return;

    board[index] = currentPlayer;
    setBoard([...board]);
    const winningCombo = winningCombos.find((comboArr) =>
      comboArr.every((indexNumber) => board[indexNumber] === currentPlayer)
    );

    if (winningCombo) setWinner(currentPlayer);
    else if (!board.includes(null)) setWinner(null);
    else setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer("X");
    setWinner(null);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 to-purple-700">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-8">Tic-Tac-Toe</h1>
        <div className="grid grid-cols-3 gap-4">
          {board.map((cell, index) => (
            <button
              key={index}
              disabled={winner ? true : board[index] ? true : false}
              className={`w-full h-20 font-bold text-4xl rounded-md transition-colors duration-300 ${
                cell === "X"
                  ? "text-indigo-500 bg-indigo-100"
                  : cell === "O"
                  ? "text-purple-500 bg-purple-100"
                  : "text-gray-400 bg-gray-100 hover:bg-gray-200"
              }`}
              onClick={() => handleClick(index)}
            >
              {cell}
            </button>
          ))}
        </div>
        {winner && (
          <div className="mt-8 text-center">
            <p className="text-2xl font-bold mb-4">
              {winner === null ? "It's a tie!" : `Player ${winner} wins!`}
            </p>
            <button
              className="px-6 py-3 bg-indigo-500 text-white rounded-md shadow-md hover:bg-indigo-600 transition-colors duration-300"
              onClick={resetGame}
            >
              Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
