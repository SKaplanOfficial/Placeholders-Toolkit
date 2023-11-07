"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../../types");
const utils_1 = require("./utils");
/**
 * Directive to set the value of a persistent variable. If the variable does not exist, it will be created. The placeholder will always be replaced with an empty string.
 */
const SetPersistentVariablePlaceholder = {
    name: "setPersistentVariable",
    regex: /{{set [a-zA-Z0-9_]+:[\\s\\S]*?}}/g,
    apply: async (str) => {
        const matches = str.match(/{{set ([a-zA-Z0-9_]+):([\s\S]*?)}}/);
        if (matches) {
            const key = matches[1];
            const value = matches[2];
            await (0, utils_1.setPersistentVariable)(key, value);
        }
        return { result: "" };
    },
    constant: false,
    fn: async (id, value) => (await SetPersistentVariablePlaceholder.apply(`{{set ${id}:${value}}}`))
        .result,
    example: "{{set myVariable:Hello World}}",
    description: "Directive to set the value of a persistent variable. If the variable does not exist, it will be created. The placeholder will always be replaced with an empty string.",
    hintRepresentation: "{{set x:...}}",
    fullRepresentation: "Set Value of Persistent Variable",
    type: types_1.PlaceholderType.StaticDirective,
    categories: [types_1.PlaceholderCategory.Memory],
};
exports.default = SetPersistentVariablePlaceholder;
