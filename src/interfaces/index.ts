export type PlayerStateType = "X" | "O";
export type BoardStateType = PlayerStateType | null;
export type ResultModalProps = {
  winner: BoardStateType;
  resetGame: () => void;
  isTie: boolean;
};
export type ResetButtonType = {
  resetGame: () => void;
  text: string;
  isReset: boolean;
};
