import { renderHook, waitFor } from "@testing-library/react";
import { useTransactions } from "../hooks/useTransactions";
import * as api from "../api/transactionService";
import * as utils from "../utils/rewardUtils";
import * as logger from "../utils/logger";

describe("useTransactions Hook", () => {

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("should fetch data and process it successfully", async () => {
    const mockTransactions = [
      {
        customerId: 1,
        name: "John",
        amount: 120,
        date: "2026-01-15",
      },
    ];

    const processedMock = {
      1: { name: "John", monthly: { Jan: 90 }, total: 90 },
    };

    jest.spyOn(api, "fetchTransactions").mockResolvedValue(mockTransactions);
    jest.spyOn(utils, "processTransactions").mockReturnValue(processedMock);

    const { result } = renderHook(() => useTransactions());

    // Initially loading true
    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    //  Data processed
    expect(api.fetchTransactions).toHaveBeenCalled();
    expect(utils.processTransactions).toHaveBeenCalledWith(mockTransactions);

    expect(result.current.processedData).toEqual(processedMock);
    expect(result.current.error).toBe("");
  });

  test("should handle API error correctly", async () => {
    const mockError = new Error("API failed");

    jest.spyOn(api, "fetchTransactions").mockRejectedValue(mockError);
    const logSpy = jest.spyOn(logger, "logError");

    const { result } = renderHook(() => useTransactions());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    //  Error handling
    expect(result.current.error).toBe("Failed to load data");

    //  Logger called
    expect(logSpy).toHaveBeenCalledWith("API error", mockError);
  });

  test("should set loading to false after success", async () => {
    jest.spyOn(api, "fetchTransactions").mockResolvedValue([]);
    jest.spyOn(utils, "processTransactions").mockReturnValue({});

    const { result } = renderHook(() => useTransactions());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.processedData).toEqual({});
  });

  test("should re-compute processedData when transactions change", async () => {
    const mockTransactions = [
      { customerId: 1, name: "John", amount: 60, date: "2026-01-01" },
    ];

    const processedMock = {
      1: { name: "John", monthly: { Jan: 10 }, total: 10 },
    };

    const processSpy = jest
      .spyOn(utils, "processTransactions")
      .mockReturnValue(processedMock);

    jest.spyOn(api, "fetchTransactions").mockResolvedValue(mockTransactions);

    const { result } = renderHook(() => useTransactions());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    //  Ensures useMemo executed
    expect(processSpy).toHaveBeenCalledWith(mockTransactions);
    expect(result.current.processedData).toEqual(processedMock);
  });

});
