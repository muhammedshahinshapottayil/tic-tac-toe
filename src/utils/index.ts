const getRandomInt = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const getRandomArray = (min: number, max: number, length: number): number[] => {
  const arr: number[] = [];
  for (let i = 0; i < length; i++) {
    arr.push(getRandomInt(min, max));
  }
  return arr;
};

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

enum Level {
  easy = "easy",
  intermediate = "intermediate",
  hard = "hard",
}

export { getRandomInt, getRandomArray, winningCombos, Level };
