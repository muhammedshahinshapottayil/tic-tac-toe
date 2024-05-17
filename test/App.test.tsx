import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import App from "../src/App";
import { Level } from "../src/utils";

describe("App", () => {
  test("renders the game board", () => {
    render(<App />);
    const cells = screen.getAllByRole("button");
    expect(cells).toHaveLength(9);
  });

  test("renders the correct initial player", () => {
    render(<App />);
    const xCells = screen.queryAllByText("X");
    const oCells = screen.queryAllByText("O");
    expect(xCells).toHaveLength(0);
    expect(oCells).toHaveLength(0);
  });

  test("updates the board correctly on cell click", () => {
    render(<App />);
    const cells = screen.getAllByRole("button");
    fireEvent.click(cells[0]);
    const xCells = screen.queryAllByText("X");
    expect(xCells).toHaveLength(1);
  });

  test("toggles the current player correctly", () => {
    render(<App />);
    const cells = screen.getAllByRole("button");
    fireEvent.click(cells[0]);
    fireEvent.click(cells[1]);
    const xCells = screen.queryAllByText("X");
    const oCells = screen.queryAllByText("O");
    expect(xCells).toHaveLength(1);
    expect(oCells).toHaveLength(1);
  });

  test("resets the game correctly", () => {
    render(<App />);
    const cells = screen.getAllByRole("button");
    fireEvent.click(cells[0]);
    const resetButton = screen.getByText("Reset");
    fireEvent.click(resetButton);
    const xCells = screen.queryAllByText("X");
    const oCells = screen.queryAllByText("O");
    expect(xCells.length).toBe(0);
    expect(oCells.length).toBe(0);
  });

  test("changes difficulty level correctly", () => {
    render(<App />);
    const autoPlayCheckbox = screen.getByRole("checkbox");
    fireEvent.click(autoPlayCheckbox);
    const difficultySelect = screen.getByRole("combobox");
    fireEvent.change(difficultySelect, { target: { value: Level.hard } });
    expect((difficultySelect as HTMLSelectElement).value).toBe(Level.hard);
  });
});
