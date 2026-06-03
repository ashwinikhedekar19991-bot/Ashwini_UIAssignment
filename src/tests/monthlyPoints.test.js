import { render, screen } from "@testing-library/react";
import MonthlyPoints from "../components/MonthlyPoints";

test("renders monthly points", () => {
  render(<MonthlyPoints monthly={{ Jan: 90 }} />);

  expect(screen.getByText("Jan: 90")).toBeInTheDocument();
});