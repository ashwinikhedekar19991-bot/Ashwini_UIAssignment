import { processTransactions } from "../utils/rewardUtils";

/**
 * Test suite for transaction processing
 */
describe("processTransactions", () => {

  const mockData = [
    { customerId: 1, name: "John", amount: 120, date: "2026-01-15" },
    { customerId: 1, name: "John", amount: 75, date: "2026-02-10" }
  ];

  test("should group transactions by customer", () => {
    const result = processTransactions(mockData);

    expect(result[1].name).toBe("John");
  });

  test("should calculate correct monthly points", () => {
    const result = processTransactions(mockData);

    // Jan: 120 → 90 points
    expect(result[1].monthly["Jan"]).toBe(90);

    // Feb: 75 → 25 points
    expect(result[1].monthly["Feb"]).toBe(25);
  });

  test("should calculate total points correctly", () => {
    const result = processTransactions(mockData);

    // Total = 90 + 25 = 115
    expect(result[1].total).toBe(115);
  });

  test("should return empty object for empty input", () => {
    const result = processTransactions([]);
    expect(result).toEqual({});
  });

});