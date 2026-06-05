/**
 * Calculates reward points based on transaction amount.
 *
 * Business Rules:
 * - 2 points for every dollar spent above $100.
 * - 1 point for every dollar spent between $50 and $100.
 * - No points for amounts up to $50.
 *
 * @param {number} amount - Transaction amount.
 * @returns {number} Total reward points earned for the transaction.
 */
import { REWARD_CONFIG } from "./constants";
import { logError } from "./logger";
export const calculateRewardPoints = (amount) => {
  try {
    if(!amount || amount < 0) return 0;
    const rountedAmount = Math.floor(amount);//handle decimals
    let points = 0;

    // Using switch to avoid nested ternary
    switch (true) {
      case rountedAmount > REWARD_CONFIG.BONUS_THRESHOLD_AMOUNT:
        // Points above 100
        points += (rountedAmount - REWARD_CONFIG.BONUS_THRESHOLD_AMOUNT
) * 2;

        // Points between 50-100
        points += (REWARD_CONFIG.BONUS_THRESHOLD_AMOUNT - REWARD_CONFIG.MIN_AMOUNT_FOR_REWARD);
        break;

      case rountedAmount > REWARD_CONFIG.MIN_AMOUNT_FOR_REWARD:
        points += (rountedAmount - REWARD_CONFIG.MIN_AMOUNT_FOR_REWARD);
        break;

      default:
        points = 0;
    }

    return points;
  } catch (error) {
    logError("Reward calculation error", error);
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