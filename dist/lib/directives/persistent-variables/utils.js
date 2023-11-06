"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePersistentVariable = exports.resetPersistentVariable = exports.setPersistentVariable = exports.getPersistentVariable = exports.getStorage = exports.setStorage = exports.STORAGE_KEYS = void 0;
const api_1 = require("@raycast/api");
exports.STORAGE_KEYS = {
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
const setStorage = async (key, value) => {
    await api_1.LocalStorage.setItem(key, JSON.stringify(value));
};
exports.setStorage = setStorage;
/**
 * Gets the value of a local storage key.
 * @param key The key to get the value of.
 * @returns The JSON-parsed value of the key.
 */
const getStorage = async (key) => {
    const localStorage = await api_1.LocalStorage.getItem(key);
    const storageString = typeof localStorage === "undefined" ? "" : localStorage;
    return storageString == "" ? [] : JSON.parse(storageString);
};
exports.getStorage = getStorage;
/**
 * Gets the current value of persistent variable from the extension's persistent local storage.
 * @param name The name of the variable to get.
 * @returns The value of the variable, or an empty string if the variable does not exist.
 */
const getPersistentVariable = async (name) => {
    const vars = await (0, exports.getStorage)(exports.STORAGE_KEYS.PERSISTENT_VARIABLES);
    const variable = vars.find((variable) => variable.name == name);
    if (variable) {
        return variable.value;
    }
    return "";
};
exports.getPersistentVariable = getPersistentVariable;
/**
 * Sets the value of a persistent variable in the extension's persistent local storage. If the variable does not exist, it will be created. The most recently set variable will be always be placed at the end of the list.
 * @param name The name of the variable to set.
 * @param value The initial value of the variable.
 */
const setPersistentVariable = async (name, value) => {
    const vars = await (0, exports.getStorage)(exports.STORAGE_KEYS.PERSISTENT_VARIABLES);
    const variable = vars.find((variable) => variable.name == name);
    if (variable) {
        vars.splice(vars.indexOf(variable), 1);
        variable.value = value;
        vars.push(variable);
    }
    else {
        vars.push({ name: name, value: value, initialValue: value });
    }
    await (0, exports.setStorage)(exports.STORAGE_KEYS.PERSISTENT_VARIABLES, vars);
};
exports.setPersistentVariable = setPersistentVariable;
/**
 * Resets the value of a persistent variable to its initial value. If the variable does not exist, nothing will happen.
 * @param name The name of the variable to reset.
 */
const resetPersistentVariable = async (name) => {
    const vars = await (0, exports.getStorage)(exports.STORAGE_KEYS.PERSISTENT_VARIABLES);
    const variable = vars.find((variable) => variable.name == name);
    if (variable) {
        vars.splice(vars.indexOf(variable), 1);
        variable.value = variable.initialValue;
        vars.push(variable);
        await (0, exports.setStorage)(exports.STORAGE_KEYS.PERSISTENT_VARIABLES, vars);
        return variable.value;
    }
    return "";
};
exports.resetPersistentVariable = resetPersistentVariable;
/**
 * Deletes a persistent variable from the extension's persistent local storage. If the variable does not exist, nothing will happen.
 * @param name The name of the variable to delete.
 */
const deletePersistentVariable = async (name) => {
    const vars = await (0, exports.getStorage)(exports.STORAGE_KEYS.PERSISTENT_VARIABLES);
    const variable = vars.find((variable) => variable.name == name);
    if (variable) {
        vars.splice(vars.indexOf(variable), 1);
        await (0, exports.setStorage)(exports.STORAGE_KEYS.PERSISTENT_VARIABLES, vars);
    }
};
exports.deletePersistentVariable = deletePersistentVariable;
