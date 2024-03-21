/**
 * Sets a value in the browser's local storage with the provided key.
 * @param {string} key - The key under which the value will be stored in local storage.
 * @param {any} value - The value to be stored. It can be of any valid JSON-compatible type.
 * @returns {boolean} - Returns true if the operation was successful, false otherwise.
 */
export const setLocalStorageItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true; // Operation was successful
  } catch (error) {
    console.error("Error setting local storage item:", error);
    return false; // An error occurred during the operation
  }
};

/**
 * Retrieves a value from the browser's local storage using the provided key.
 * @param {string} key - The key under which the value is stored in local storage.
 * @returns {any} - Returns the retrieved value if it exists, or null if the key does not exist or an error occurs.
 */
export const getLocalStorageItem = (key) => {
  try {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : null;
  } catch (error) {
    console.error("Error getting local storage item:", error);
    return null;
  }
};
