import { LocalStorage } from "@raycast/api";
import { PersistentVariable } from "./types";

export const STORAGE_KEYS = {
  /**
   * Key for the list of persistent variables as JSON objects containing the variable's name,  value, and initial (default) value.
   */
  PERSISTENT_VARIABLES: "--persistent-variables",

  /**
   * Key for the list of UUIDs used in placeholders thus far.
   */
  USED_UUIDS: "--uuids",
};

/**
 * Sets the value of a local storage key.
 * @param key The key to set the value of.
 * @param value The string value to set the key to.
 */
export const setStorage = async (key: string, value: unknown) => {
  await LocalStorage.setItem(key, JSON.stringify(value));
};

/**
 * Gets the value of a local storage key.
 * @param key The key to get the value of.
 * @returns The JSON-parsed value of the key.
 */
export const getStorage = async (key: string) => {
  const localStorage = await LocalStorage.getItem<string>(key);
  const storageString = typeof localStorage === "undefined" ? "" : localStorage;
  return storageString == "" ? [] : JSON.parse(storageString);
};

/**
 * Gets the current value of persistent variable from the extension's persistent local storage.
 * @param name The name of the variable to get.
 * @returns The value of the variable, or an empty string if the variable does not exist.
 */
export const getPersistentVariable = async (name: string): Promise<string> => {
  const vars: PersistentVariable[] = await getStorage(STORAGE_KEYS.PERSISTENT_VARIABLES);
  const variable = vars.find((variable) => variable.name == name);
  if (variable) {
    return variable.value;
  }
  return "";
};

/**
 * Sets the value of a persistent variable in the extension's persistent local storage. If the variable does not exist, it will be created. The most recently set variable will be always be placed at the end of the list.
 * @param name The name of the variable to set.
 * @param value The initial value of the variable.
 */
export const setPersistentVariable = async (name: string, value: string) => {
  const vars: PersistentVariable[] = await getStorage(STORAGE_KEYS.PERSISTENT_VARIABLES);
  const variable = vars.find((variable) => variable.name == name);
  if (variable) {
    vars.splice(vars.indexOf(variable), 1);
    variable.value = value;
    vars.push(variable);
  } else {
    vars.push({ name: name, value: value, initialValue: value });
  }
  await setStorage(STORAGE_KEYS.PERSISTENT_VARIABLES, vars);
};

/**
 * Resets the value of a persistent variable to its initial value. If the variable does not exist, nothing will happen.
 * @param name The name of the variable to reset.
 */
export const resetPersistentVariable = async (name: string): Promise<string> => {
  const vars: PersistentVariable[] = await getStorage(STORAGE_KEYS.PERSISTENT_VARIABLES);
  const variable = vars.find((variable) => variable.name == name);
  if (variable) {
    vars.splice(vars.indexOf(variable), 1);
    variable.value = variable.initialValue;
    vars.push(variable);
    await setStorage(STORAGE_KEYS.PERSISTENT_VARIABLES, vars);
    return variable.value;
  }
  return "";
};

/**
 * Deletes a persistent variable from the extension's persistent local storage. If the variable does not exist, nothing will happen.
 * @param name The name of the variable to delete.
 */
export const deletePersistentVariable = async (name: string) => {
  const vars: PersistentVariable[] = await getStorage(STORAGE_KEYS.PERSISTENT_VARIABLES);
  const variable = vars.find((variable) => variable.name == name);
  if (variable) {
    vars.splice(vars.indexOf(variable), 1);
    await setStorage(STORAGE_KEYS.PERSISTENT_VARIABLES, vars);
  }
};
