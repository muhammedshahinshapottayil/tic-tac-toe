import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { ResetButton } from "../../src/components/button";

describe("Rendering dynamic reset button which is used for restart and reset", () => {
  it("Should renders the reset button", () => {
    render(<ResetButton handleClick={() => {}} isReset={true} text="Reset" />);

    // let button = screen.getByRole("button", {
    //   name: "",
    // });

    let button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    button = screen.getByText(/Reset/);
    expect(button).toBeInTheDocument();
  });

  it("Should renders the restart button", () => {
    render(
      <ResetButton handleClick={() => {}} isReset={false} text="Restart" />
    );
    let button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    button = screen.getByText("Restart");
    expect(button).toBeInTheDocument();
  });
});
