export type PlayerStateType = "X" | "O";
export type BoardStateType = PlayerStateType | null;
export type ResultModalProps = {
  winner: BoardStateType;
  restartGame: () => void;
  isTie: boolean;
};
export type ResetButtonType = {
  handleClick: () => void;
  text: string;
  isReset: boolean;
};
