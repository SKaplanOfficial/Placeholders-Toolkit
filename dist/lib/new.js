"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildPlaceholdersFromFnDict = exports.buildPlaceholdersFromValueDict = exports.newPlaceholder = exports.dummyPlaceholder = void 0;
const types_1 = require("./types");
/**
 * A dummy placeholder.
 * @returns A placeholder object.
 */
const dummyPlaceholder = () => {
    return {
        name: "New Placeholder",
        regex: /{{newPlaceholder}}/g,
        apply: async (str, context) => ({
            result: "",
        }),
        constant: true,
        fn: async (content) => (await (0, exports.dummyPlaceholder)().apply("{{newPlaceholder}}")).result,
        description: "A dummy placeholder.",
        example: "This is an example of a dummy placeholder: {{newPlaceholder}}",
        hintRepresentation: "{{newPlaceholder}}",
        fullRepresentation: "Dummy Placeholder",
        type: types_1.PlaceholderType.Informational,
        categories: [],
    };
};
exports.dummyPlaceholder = dummyPlaceholder;
/**
 * Creates a new placeholder.
 * @param name The name of the placeholder.
 * @param regex The regex to match the placeholder.
 * @param apply_fn The function to apply to the placeholder. Specify either this or replace_with.
 * @param replace_with The string to replace the placeholder with. Specify either this or apply_fn.
 * @param constant Whether the placeholder is constant.
 * @param description A brief description of the placeholder.
 * @param example An example of the placeholder.
 * @param hintRepresentation A representation of the placeholder to show in hints.
 * @param fullRepresentation A representation of the placeholder to show in detailed explanations.
 * @param type The type of the placeholder.
 * @param categories The categories of the placeholder.
 * @returns A placeholder object.
 */
const newPlaceholder = (name, options) => {
    if (options?.apply_fn != undefined && options?.replace_with != undefined)
        throw new Error("Cannot specify both apply_fn and replace_with");
    if (options?.replace_with != undefined) {
        if (options.constant) {
            options.apply_fn = async (str, context) => ({
                result: options.replace_with || "",
                [name]: options.replace_with || "",
            });
        }
        else {
            options.apply_fn = async (str, context) => ({
                result: options.replace_with || "",
                [name]: options.replace_with || "",
            });
        }
    }
    const newPlaceholder = {
        name: name,
        regex: options?.regex || new RegExp(`{{${name}}}`, "g"),
        apply: options?.apply_fn ||
            (async (str, context) => ({
                result: "",
            })),
        result_keys: [name],
        constant: options?.constant || false,
        fn: async (content) => (await newPlaceholder.apply(`{{${name}}}`)).result,
        description: options?.description || "",
        example: options?.example || "",
        hintRepresentation: options?.hintRepresentation || `{{${name}}}`,
        fullRepresentation: options?.fullRepresentation || `${name} (Custom)`,
        type: options?.type || types_1.PlaceholderType.Informational,
        categories: options?.categories || [],
    };
    return newPlaceholder;
};
exports.newPlaceholder = newPlaceholder;
/**
 * Builds a list of placeholders from a list of placeholder names and values.
 * @param valueDict A dictionary of placeholder names and values.
 * @returns A list of placeholders.
 */
const buildPlaceholdersFromValueDict = (valueDict) => {
    const placeholders = [];
    for (const key in valueDict) {
        if (Object.prototype.hasOwnProperty.call(valueDict, key)) {
            const value = valueDict[key];
            placeholders.push((0, exports.newPlaceholder)(key, { replace_with: value, constant: true }));
        }
    }
    return placeholders;
};
exports.buildPlaceholdersFromValueDict = buildPlaceholdersFromValueDict;
/**
 * Builds a list of placeholders from a list of placeholder names and application functions.
 * @param fnDict A dictionary of placeholder names and application functions.
 * @returns A list of placeholders.
 */
const buildPlaceholdersFromFnDict = (fnDict) => {
    const placeholders = [];
    for (const key in fnDict) {
        if (Object.prototype.hasOwnProperty.call(fnDict, key)) {
            const fn = fnDict[key];
            placeholders.push((0, exports.newPlaceholder)(key, { apply_fn: fn }));
        }
    }
    return placeholders;
};
exports.buildPlaceholdersFromFnDict = buildPlaceholdersFromFnDict;
