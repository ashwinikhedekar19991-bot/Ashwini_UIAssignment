import { render, screen } from "@testing-library/react";
import MonthlyPoints from "../components/MonthlyPoints";

describe("MonthlyPoints", () => {
  test("renders table headers", () => {
    render(<MonthlyPoints monthly={{ "Jan-2024": 90 }} />);

    expect(screen.getByText("Month")).toBeInTheDocument();
    expect(screen.getByText("Year")).toBeInTheDocument();
    expect(screen.getByText("Points")).toBeInTheDocument();
  });

  test("renders monthly data correctly", () => {
    render(<MonthlyPoints monthly={{ "Jan-2024": 90 }} />);

    expect(screen.getByText("Jan")).toBeInTheDocument();
    expect(screen.getByText("2024")).toBeInTheDocument();
    expect(screen.getByText("90")).toBeInTheDocument();
  });

  test("renders multiple months correctly", () => {
    render(
      <MonthlyPoints
        monthly={{
          "Jan-2024": 90,
          "Feb-2024": 120,
          "Mar-2024": 75,
        }}
      />
    );

    // Month names
    expect(screen.getByText("Jan")).toBeInTheDocument();
    expect(screen.getByText("Feb")).toBeInTheDocument();
    expect(screen.getByText("Mar")).toBeInTheDocument();

    // Points
    expect(screen.getByText("90")).toBeInTheDocument();
    expect(screen.getByText("120")).toBeInTheDocument();
    expect(screen.getByText("75")).toBeInTheDocument();

    // Year check
    expect(screen.getAllByText("2024").length).toBeGreaterThan(0);
  });
});