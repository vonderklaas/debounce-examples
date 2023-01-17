import { useState, useEffect } from 'react';

// Update a variable when use stopped typing after given delay
export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      // If needed delay passed and value didn't changed, we set it
      setDebouncedValue(value);
    }, delay);

    // Cancel timeout if value changes
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
