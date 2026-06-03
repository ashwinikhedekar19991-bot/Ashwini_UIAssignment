/**
 * @module logger
 * Centralized error logging utility
 */

/**
 * Logs error with message
 * @param {string} message
 * @param {any} error
 */
export const logError = (message, error) => {
  console.error(`[ERROR]: ${message}`, error);
};