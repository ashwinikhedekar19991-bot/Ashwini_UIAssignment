import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "../App";
import * as useTransactionsHook from "../hooks/useTransactions";
import * as useDebounceHook from "../hooks/useDebounce";

// ✅ Mock child components to isolate App logic
jest.mock("../components/CustomerCard", () => ({ name, total, children }) => (
  <div data-testid="customer-card">
    <span>{name}</span>
    <span>{total}</span>
    {children}
  </div>
));

jest.mock("../components/MonthlyPoints", () => ({ monthly }) => (
  <div data-testid="monthly-points">
    {Object.keys(monthly).join(",")}
  </div>
));

jest.mock("../components/SearchBar", () => ({ value, onChange }) => (
  <input
    placeholder="Search customer"
    value={value}
    onChange={onChange}
  />
));

describe("App Component", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("shows loading state", () => {
    jest.spyOn(useTransactionsHook, "useTransactions").mockReturnValue({
      processedData: {},
      loading: true,
      error: "",
    });

    render(<App />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("shows error state", () => {
    jest.spyOn(useTransactionsHook, "useTransactions").mockReturnValue({
      processedData: {},
      loading: false,
      error: "Failed to load data",
    });

    render(<App />);

    expect(screen.getByText("Failed to load data")).toBeInTheDocument();
  });

  test("renders customer data correctly", () => {
    const mockData = {
      1: {
        name: "John",
        total: 90,
        monthly: { Jan: 90 },
      },
    };

    jest.spyOn(useTransactionsHook, "useTransactions").mockReturnValue({
      processedData: mockData,
      loading: false,
      error: "",
    });

    // ✅ Debounce returns same value
    jest.spyOn(useDebounceHook, "useDebounce").mockImplementation((val) => val);

    render(<App />);

    expect(screen.getByText("Reward Dashboard")).toBeInTheDocument();
    expect(screen.getByText("John")).toBeInTheDocument();
    expect(screen.getByText("90")).toBeInTheDocument();

    expect(screen.getByTestId("customer-card")).toBeInTheDocument();
    expect(screen.getByTestId("monthly-points")).toBeInTheDocument();
  });

  test("filters customers based on search input", () => {
    const mockData = {
      1: {
        name: "John",
        total: 90,
        monthly: { Jan: 90 },
      },
      2: {
        name: "Jane",
        total: 50,
        monthly: { Feb: 50 },
      },
    };

    jest.spyOn(useTransactionsHook, "useTransactions").mockReturnValue({
      processedData: mockData,
      loading: false,
      error: "",
    });

    jest.spyOn(useDebounceHook, "useDebounce").mockImplementation((val) => val);

    render(<App />);

    const input = screen.getByPlaceholderText("Search customer");

    // ✅ Filter for Jane
    fireEvent.change(input, { target: { value: "Jane" } });

    expect(screen.queryByText("John")).not.toBeInTheDocument();
    expect(screen.getByText("Jane")).toBeInTheDocument();
  });

  test("is case insensitive when filtering", () => {
    const mockData = {
      1: {
        name: "John",
        total: 90,
        monthly: { Jan: 90 },
      },
    };

    jest.spyOn(useTransactionsHook, "useTransactions").mockReturnValue({
      processedData: mockData,
      loading: false,
      error: "",
    });

    jest.spyOn(useDebounceHook, "useDebounce").mockImplementation((val) => val);

    render(<App />);

    const input = screen.getByPlaceholderText("Search customer");

    // ✅ lowercase search
    fireEvent.change(input, { target: { value: "john" } });

    expect(screen.getByText("John")).toBeInTheDocument();
  });

  test("shows empty list when no match found", () => {
    const mockData = {
      1: {
        name: "John",
        total: 90,
        monthly: { Jan: 90 },
      },
    };

    jest.spyOn(useTransactionsHook, "useTransactions").mockReturnValue({
      processedData: mockData,
      loading: false,
      error: "",
    });

    jest.spyOn(useDebounceHook, "useDebounce").mockImplementation((val) => val);

    render(<App />);

    const input = screen.getByPlaceholderText("Search customer");

    fireEvent.change(input, { target: { value: "XYZ" } });

    expect(screen.queryByTestId("customer-card")).not.toBeInTheDocument();
  });

});