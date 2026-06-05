
/**
 * Delays updating a value until after a specified delay has elapsed.
 * Useful for debouncing user input and reducing unnecessary operations
 * such as API calls during typing.
*
* @param {*} value - The value to debounce.
* @param {number} [delay=500] - Delay in milliseconds before updating the debounced value.
* @returns {*} The debounced value.
*/
import { useState, useEffect } from "react";
export const useDebounce = (value, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};