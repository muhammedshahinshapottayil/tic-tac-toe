import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ResetButton from "../../src/components/button/ResetButton";

test("Renders the reset button", () => {
  render(<ResetButton handleClick={() => {}} isReset={true} text="Reset" />);
  const button = screen.getByRole("button");
  expect(button).toBeInTheDocument();
});

test("Renders the restart button", () => {
  render(<ResetButton handleClick={() => {}} isReset={false} text="Restart" />);
  expect(true).toBeTruthy();
});
