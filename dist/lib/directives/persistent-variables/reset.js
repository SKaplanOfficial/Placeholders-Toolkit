"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../../types");
const utils_1 = require("./utils");
/**
 * Directive to reset the value of a persistent variable to its initial value. If the variable does not exist, nothing will happen. The placeholder will always be replaced with an empty string.
 */
const ResetPersistentVariablePlaceholder = {
    name: "reset",
    regex: /{{reset [a-zA-Z0-9_]+}}/g,
    apply: async (str) => {
        const matches = str.match(/{{reset ([a-zA-Z0-9_]+)}}/);
        if (matches) {
            const key = matches[1];
            const initialValue = await (0, utils_1.resetPersistentVariable)(key);
            await (0, utils_1.setPersistentVariable)(key, initialValue);
        }
        return { result: "" };
    },
    constant: false,
    fn: async (id) => (await ResetPersistentVariablePlaceholder.apply(`{{reset ${id}}}`)).result,
    example: "{{reset storedText}}",
    description: "Resets the value of a persistent variable to its initial value. If the variable does not exist, nothing will happen. Replaced with an empty string.",
    hintRepresentation: "{{reset x}}",
    fullRepresentation: "Reset Persistent Variable",
    type: types_1.PlaceholderType.StaticDirective,
    categories: [types_1.PlaceholderCategory.Memory],
};
exports.default = ResetPersistentVariablePlaceholder;
