import { fetchTransactions } from "../api/transactionService";

//  Mock global fetch
global.fetch = jest.fn();

describe("fetchTransactions API", () => {

  let consoleSpy;

  beforeEach(() => {
    jest.clearAllMocks();

    //  Mock console.error globally
    consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  test("should fetch and return data when API call is successful", async () => {
    const mockData = [
      { id: 1, name: "John", amount: 100 }
    ];

    fetch.mockResolvedValue({
      ok: true,
      json: async () => mockData,
    });

    const result = await fetchTransactions();

    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:4000/transactions"
    );
    expect(result).toEqual(mockData);
  });

  test("should throw error when response is not ok", async () => {
    fetch.mockResolvedValue({
      ok: false,
    });

    await expect(fetchTransactions()).rejects.toThrow(
      "Failed to fetch transactions"
    );

    //  Optional: verify logging
    expect(consoleSpy).toHaveBeenCalledWith(
      "API Error:",
      expect.any(Error)
    );
  });

  test("should handle fetch rejection (network error)", async () => {
    fetch.mockRejectedValue(new Error("Network error"));

    await expect(fetchTransactions()).rejects.toThrow("Network error");

    expect(consoleSpy).toHaveBeenCalledWith(
      "API Error:",
      expect.any(Error)
    );
  });

  test("should log error when exception occurs", async () => {
    fetch.mockRejectedValue(new Error("API down"));

    await expect(fetchTransactions()).rejects.toThrow();

    expect(consoleSpy).toHaveBeenCalledTimes(1);
    expect(consoleSpy).toHaveBeenCalledWith(
      "API Error:",
      expect.any(Error)
    );
  });

});