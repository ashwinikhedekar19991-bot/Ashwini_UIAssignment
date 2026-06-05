/**
 * Fetches transaction data and returns processed reward information.
 * Handles loading and error states, and memoizes transaction processing
 * for improved performance.
 *
 * @returns {Object} Hook state and processed data.
 * @returns {Array} returns.processedData - Processed customer reward data.
 * @returns {boolean} returns.loading - Indicates whether data is being loaded.
 * @returns {string} returns.error - Error message if data loading fails.
 */
import { useEffect, useState, useMemo } from "react";
import { fetchTransactions } from "../api/transactionService";
import { processTransactions } from "../utils/rewardUtils";
import { logError } from "../utils/logger";
export const useTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
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