"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../../types");
const utils_1 = require("./utils");
/**
 * Directive to get the value of a persistent variable. If the variable does not exist, the placeholder will be replaced with an empty string.
 */
const GetPersistentVariablePlaceholder = {
    name: "get",
    regex: /{{get [a-zA-Z0-9_]+}}/g,
    apply: async (str) => {
        const matches = str.match(/{{get ([a-zA-Z0-9_]+)}}/);
        if (matches) {
            const key = matches[1];
            return { result: (await (0, utils_1.getPersistentVariable)(key)) || "" };
        }
        return { result: "" };
    },
    constant: false,
    fn: async (id) => (await GetPersistentVariablePlaceholder.apply(`{{get ${id}}}`)).result,
    example: "Summarize this: {{get storedText}}",
    description: "Replaced with the value of a persistent variable. If the variable has not been set, the placeholder will be replaced with an empty string.",
    hintRepresentation: "{{get x}}",
    fullRepresentation: "Value of Persistent Variable",
    type: types_1.PlaceholderType.StaticDirective,
    categories: [types_1.PlaceholderCategory.Memory],
};
exports.default = GetPersistentVariablePlaceholder;
