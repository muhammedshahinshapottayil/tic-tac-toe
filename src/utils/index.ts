const getRandomInt = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const getRandomArray = (min: number, max: number, length: number): number[] => {
  const arr: number[] = [];
  for (let i = 0; i < length; i++) {
    arr.push(getRandomInt(min, max));
  }
  return arr;
};

export { getRandomInt, getRandomArray };
