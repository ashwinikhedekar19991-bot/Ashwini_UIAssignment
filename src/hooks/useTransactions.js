import { useEffect, useState, useMemo } from "react";
import { fetchTransactions } from "../api/transactionService";
import { processTransactions } from "../utils/rewardUtils";
import { logError } from "../utils/logger";

/**
 * Custom hook for managing transaction data
 */
export const useTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await fetchTransactions();
        setTransactions(result);
      } catch (err) {
        logError("API error", err);
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Memoized processing (performance optimization)
  const processedData = useMemo(() => {
    return processTransactions(transactions);
  }, [transactions]);

  return { processedData, loading, error };
};