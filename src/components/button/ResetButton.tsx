import { ResetButtonType } from "../../interfaces";

function ResetButton({ handleClick, text, isReset }: ResetButtonType) {
  return (
    <button
      className={`${
        isReset ? "ml-2 px-2 py-1" : "px-4 py-2 "
      } font-semibold bg-indigo-500 text-white rounded-md shadow-md hover:bg-indigo-600 transition-colors duration-300`}
      onClick={handleClick}
    >
      {text}
    </button>
  );
}

export default ResetButton;
