export declare const STORAGE_KEYS: {
    /**
     * Key for the list of persistent variables as JSON objects containing the variable's name,  value, and initial (default) value.
     */
    PERSISTENT_VARIABLES: string;
    /**
     * Key for the list of UUIDs used in placeholders thus far.
     */
    USED_UUIDS: string;
};
/**
 * Sets the value of a local storage key.
 * @param key The key to set the value of.
 * @param value The string value to set the key to.
 */
export declare const setStorage: (key: string, value: unknown) => Promise<void>;
/**
 * Gets the value of a local storage key.
 * @param key The key to get the value of.
 * @returns The JSON-parsed value of the key.
 */
export declare const getStorage: (key: string) => Promise<any>;
/**
 * Gets the current value of persistent variable from the extension's persistent local storage.
 * @param name The name of the variable to get.
 * @returns The value of the variable, or an empty string if the variable does not exist.
 */
export declare const getPersistentVariable: (name: string) => Promise<string>;
/**
 * Sets the value of a persistent variable in the extension's persistent local storage. If the variable does not exist, it will be created. The most recently set variable will be always be placed at the end of the list.
 * @param name The name of the variable to set.
 * @param value The initial value of the variable.
 */
export declare const setPersistentVariable: (name: string, value: string) => Promise<void>;
/**
 * Resets the value of a persistent variable to its initial value. If the variable does not exist, nothing will happen.
 * @param name The name of the variable to reset.
 */
export declare const resetPersistentVariable: (name: string) => Promise<string>;
/**
 * Deletes a persistent variable from the extension's persistent local storage. If the variable does not exist, nothing will happen.
 * @param name The name of the variable to delete.
 */
export declare const deletePersistentVariable: (name: string) => Promise<void>;
