import { REWARD_CONFIG } from "./constants";
import { logError } from "./logger";

/**
 * Calculate reward points for given amount
 * Business Rule:
 * - 2 points for every dollar above $100
 * - 1 point for every dollar between $50 and $100
 * 
 * @param {number} amount
 * @returns {number}
 */
export const calculateRewardPoints = (amount) => {
  try {
    let points = 0;

    // Using switch to avoid nested ternary
    switch (true) {
      case amount > REWARD_CONFIG.MID:
        // Points above 100
        points += (amount - REWARD_CONFIG.MID) * 2;

        // Points between 50-100
        points += (REWARD_CONFIG.MID - REWARD_CONFIG.MIN);
        break;

      case amount > REWARD_CONFIG.MIN:
        points += (amount - REWARD_CONFIG.MIN);
        break;

      default:
        points = 0;
    }

    return points;
  } catch (error) {
    logError("Failed in calculateRewardPoints", error);
    return 0;
  }
};

/**
 * Process transaction data into grouped format
 * @param {Array} transactions
 * @returns {Object}
 */
export const processTransactions = (transactions) => {
  try {
    return transactions.reduce((accumulator, txn) => {
      const month = new Date(txn.date)
        .toLocaleString("default", { month: "short" });

      const points = calculateRewardPoints(txn.amount);

      if (!accumulator[txn.customerId]) {
        accumulator[txn.customerId] = {
          name: txn.name,
          monthly: {},
          total: 0
        };
      }

      accumulator[txn.customerId].monthly[month] =
        (accumulator[txn.customerId].monthly[month] || 0) + points;

      accumulator[txn.customerId].total += points;

      return accumulator;
    }, {});
  } catch (error) {
    logError("Failed in processTransactions", error);
    return {};
  }
};