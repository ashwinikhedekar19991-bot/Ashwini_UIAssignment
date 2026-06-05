import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "../components/SearchBar";

describe("SearchBar Component", () => {

  test("renders input with placeholder", () => {
    render(<SearchBar value="" onChange={() => {}} />);

    const input = screen.getByPlaceholderText("Search customer");
    expect(input).toBeInTheDocument();
  });

  test("shows the provided value", () => {
    render(<SearchBar value="John" onChange={() => {}} />);

    const input = screen.getByDisplayValue("John");
    expect(input).toBeInTheDocument();
  });

  test("calls onChange when user types", () => {
    const mockOnChange = jest.fn();

    render(<SearchBar value="" onChange={mockOnChange} />);

    const input = screen.getByPlaceholderText("Search customer");

    //  Faster than userEvent
    fireEvent.change(input, { target: { value: "Jane" } });

    expect(mockOnChange).toHaveBeenCalled();
  });

  test("allows typing into the input field", () => {
    const Wrapper = () => {
      const [value, setValue] = React.useState("");
      return (
        <SearchBar
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      );
    };

    render(<Wrapper />);

    const input = screen.getByPlaceholderText("Search customer");

    // Faster
    fireEvent.change(input, { target: { value: "Jane" } });

    expect(input).toHaveValue("Jane");
  });

});