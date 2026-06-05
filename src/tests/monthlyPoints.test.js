import { render, screen } from "@testing-library/react";
import MonthlyPoints from "../components/MonthlyPoints";

describe("MonthlyPoints", () => {
  test("renders table headers", () => {
    render(<MonthlyPoints monthly={{ Jan: 90 }} />);

    expect(screen.getByText("Month")).toBeInTheDocument();
    expect(screen.getByText("Points")).toBeInTheDocument();
  });

  test("renders monthly data", () => {
    render(<MonthlyPoints monthly={{ Jan: 90 }} />);

    expect(screen.getByText("Jan")).toBeInTheDocument();
    expect(screen.getByText("90")).toBeInTheDocument();
  });

  test("renders multiple months", () => {
    render(
      <MonthlyPoints
        monthly={{
          Jan: 90,
          Feb: 120,
          Mar: 75,
        }}
      />
    );

    expect(screen.getByText("Jan")).toBeInTheDocument();
    expect(screen.getByText("Feb")).toBeInTheDocument();
    expect(screen.getByText("Mar")).toBeInTheDocument();

    expect(screen.getByText("90")).toBeInTheDocument();
    expect(screen.getByText("120")).toBeInTheDocument();
    expect(screen.getByText("75")).toBeInTheDocument();
  });
});