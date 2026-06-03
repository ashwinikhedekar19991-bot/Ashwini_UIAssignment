/**
 * Fetch transactions from JSON Server
 */
export const fetchTransactions = async () => {
  try {
    const response = await fetch("http://localhost:4000/transactions");

    if (!response.ok) {
      throw new Error("Failed to fetch transactions");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};