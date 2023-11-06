"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../../types");
const utils_1 = require("./utils");
/**
 * Placeholder for a comma-separated list of all persistent variables. If no persistent variables have been set, this placeholder will be replaced with an empty string.
 */
const VarsPlaceholder = {
    name: "vars",
    regex: /{{vars}}/g,
    apply: async () => {
        const vars = await (0, utils_1.getStorage)(utils_1.STORAGE_KEYS.PERSISTENT_VARIABLES);
        if (Array.isArray(vars)) {
            const varNames = vars.map((v) => v.name);
            return { result: varNames.join(", "), vars: varNames.join(", ") };
        }
        return { result: "", vars: "" };
    },
    result_keys: ["vars"],
    constant: true,
    fn: async () => (await VarsPlaceholder.apply("{{vars}}")).result,
    example: "List these alphabetically: {{vars}}",
    description: "Replaced with a comma-separated list of all persistent variables. If no persistent variables have been set, the placeholder will be replaced with an empty string.",
    hintRepresentation: "{{vars}}",
    fullRepresentation: "List of Persistent Variables",
    type: types_1.PlaceholderType.StaticDirective,
    categories: [types_1.PlaceholderCategory.Memory],
};
exports.default = VarsPlaceholder;
