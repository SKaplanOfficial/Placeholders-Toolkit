"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadPlaceholdersFromFile = exports.loadPlaceholdersFromJSONString = exports.loadPlaceholderFromJSONString = void 0;
const fs = __importStar(require("fs"));
const types_1 = require("./types");
/**
 * Validates a placeholder JSON object.
 * @param jsonObject The JSON object to validate.
 * @returns A tuple containing a boolean indicating whether the JSON object is valid, and a string containing an error message if the JSON object is invalid.
 */
const validatePlaceholderJSON = (jsonObject) => {
    if (typeof jsonObject !== "object")
        return [false, "Placeholder is not an object."];
    if (!jsonObject.hasOwnProperty("name"))
        return [false, "Placeholder is missing name field."];
    if (!jsonObject.hasOwnProperty("value"))
        return [false, "Placeholder is missing value field."];
    if (typeof jsonObject.name !== "string")
        return [false, "Placeholder name is not a string."];
    if (typeof jsonObject.value !== "string")
        return [false, "Placeholder value is not a string."];
    if (jsonObject.hasOwnProperty("regex") &&
        typeof jsonObject.regex !== "string")
        return [false, "Placeholder regex is not a string."];
    if (jsonObject.hasOwnProperty("description") &&
        typeof jsonObject.description !== "string")
        return [false, "Placeholder description is not a string."];
    if (jsonObject.hasOwnProperty("example") &&
        typeof jsonObject.example !== "string")
        return [false, "Placeholder example is not a string."];
    if (jsonObject.hasOwnProperty("hintRepresentation") &&
        typeof jsonObject.hintRepresentation !== "string")
        return [false, "Placeholder hintRepresentation is not a string."];
    if (jsonObject.hasOwnProperty("fullRepresentation") &&
        typeof jsonObject.fullRepresentation !== "string")
        return [false, "Placeholder fullRepresentation is not a string."];
    if (jsonObject.hasOwnProperty("type") && typeof jsonObject.type !== "number")
        return [false, "Placeholder type is not a number."];
    if (jsonObject.hasOwnProperty("categories") &&
        !Array.isArray(jsonObject.categories))
        return [false, "Placeholder categories is not an array."];
    if (jsonObject.hasOwnProperty("categories") &&
        jsonObject.categories.some((category) => typeof category !== "number"))
        return [false, "Placeholder categories contains a non-number."];
    return [true, ""];
};
/**
 * Loads a *single* placeholder from a JSON string.
 * @param jsonString The JSON string to load a placeholder from.
 * @returns A placeholder object.
 *
 * @see {@link loadPlaceholdersFromJSONString}
 */
const loadPlaceholderFromJSONString = (jsonString) => {
    try {
        const newPlaceholderData = JSON.parse(jsonString);
        const validity = validatePlaceholderJSON(newPlaceholderData);
        if (!validity[0])
            throw `Error loading placeholder from JSON string. ${validity[1]}`;
        const newPlaceholder = {
            name: newPlaceholderData.name,
            regex: new RegExp(newPlaceholderData.regex || `{{${newPlaceholderData.name}}}`),
            apply: async (str, context) => {
                const match = str.match(new RegExp(`${newPlaceholderData.regex}`));
                let value = newPlaceholderData.value;
                (match || []).forEach((m, index) => {
                    value = value.replaceAll(`$${index}`, m?.replaceAll("\\", "\\\\") || "");
                });
                const res = {
                    result: value,
                };
                res[newPlaceholderData.name] = value;
                return res;
            },
            result_keys: [newPlaceholderData.name],
            constant: true,
            fn: async (content) => (await newPlaceholder.apply(`{{${newPlaceholderData.name}}}`)).result,
            description: newPlaceholderData.description || "",
            example: newPlaceholderData.example || "",
            hintRepresentation: newPlaceholderData.hintRepresentation ||
                `{{${newPlaceholderData.name}}}`,
            fullRepresentation: `${newPlaceholderData.name} (Custom)`,
            type: newPlaceholderData.type || types_1.PlaceholderType.Informational,
            categories: newPlaceholderData.categories || [],
        };
        return newPlaceholder;
    }
    catch (e) {
        if (e instanceof SyntaxError)
            throw `Error loading placeholder from JSON string. Invalid JSON string: ${jsonString}`;
        throw e;
    }
};
exports.loadPlaceholderFromJSONString = loadPlaceholderFromJSONString;
/**
 * Loads *multiple* placeholders from a JSON string.
 * @param jsonString The JSON string to load placeholders from.
 * @returns An array of placeholder objects.
 *
 * @example
 * ```ts
 * const customPlaceholders = loadPlaceholdersFromJSONString(`{
 *    "{{test}}": {
 *    "name": "test",
 *    "regex": "test",
 *    "value": "my value"
 *   }
 * }`);
 * const result = await PLApplicator.applyToString("{{test}}", undefined, customPlaceholders);
 * console.log(result); // my value
 * ```
 *
 * @see {@link loadPlaceholderFromJSONString}
 */
const loadPlaceholdersFromJSONString = (jsonString) => {
    try {
        const newPlaceholdersData = JSON.parse(jsonString);
        const newPlaceholders = Object.entries(newPlaceholdersData).map(([key, placeholder]) => {
            const validity = validatePlaceholderJSON(placeholder);
            if (!validity[0])
                throw `Error loading placeholder from JSON string. ${validity[1]}`;
            const newPlaceholder = {
                name: placeholder.name,
                regex: new RegExp(`${key}`),
                apply: async (str, context) => {
                    const match = str.match(new RegExp(`${key}`));
                    let value = placeholder.value;
                    (match || []).forEach((m, index) => {
                        value = value.replaceAll(`$${index}`, m?.replaceAll("\\", "\\\\") || "");
                    });
                    const res = {
                        result: value,
                    };
                    res[placeholder.name] = value;
                    return res;
                },
                result_keys: [placeholder.name],
                constant: true,
                fn: async (content) => (await newPlaceholder.apply(`{{${key}}}`)).result,
                description: placeholder.description,
                example: placeholder.example,
                hintRepresentation: placeholder.hintRepresentation,
                fullRepresentation: `${placeholder.name} (Custom)`,
                type: placeholder.type || types_1.PlaceholderType.Informational,
                categories: placeholder.categories || [],
            };
            return newPlaceholder;
        });
        return newPlaceholders;
    }
    catch (e) {
        if (e instanceof SyntaxError)
            throw `Error loading placeholders from JSON string. Invalid JSON string: ${jsonString}`;
        throw e;
    }
};
exports.loadPlaceholdersFromJSONString = loadPlaceholdersFromJSONString;
/**
 * Loads placeholders from a JSON file.
 * @returns An array of placeholder objects.
 */
const loadPlaceholdersFromFile = async (filepath) => {
    try {
        const fileContents = await fs.promises.readFile(filepath, "utf-8");
        return (0, exports.loadPlaceholdersFromJSONString)(fileContents);
    }
    catch (e) {
        if (e instanceof SyntaxError)
            throw `Error loading placeholders from file. Invalid JSON file: ${filepath}`;
        throw e;
    }
};
exports.loadPlaceholdersFromFile = loadPlaceholdersFromFile;
