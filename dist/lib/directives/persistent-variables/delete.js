"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../../types");
const utils_1 = require("./utils");
/**
 * Directive to delete a persistent variable. If the variable does not exist, nothing will happen. The placeholder will always be replaced with an empty string.
 */
const DeletePersistentVariablePlaceholder = {
    name: "delete",
    regex: /{{delete [a-zA-Z0-9_]+}}/g,
    apply: async (str) => {
        const matches = str.match(/{{delete ([a-zA-Z0-9_]+)}}/);
        if (matches) {
            const key = matches[1];
            await (0, utils_1.deletePersistentVariable)(key);
        }
        return { result: "" };
    },
    constant: false,
    fn: async (id) => (await DeletePersistentVariablePlaceholder.apply(`{{delete ${id}}}`)).result,
    example: "{{delete storedText}}",
    description: "Deletes a persistent variable. If the variable does not exist, nothing will happen. Replaced with an empty string.",
    hintRepresentation: "{{delete x}",
    fullRepresentation: "Delete Persistent Variable",
    type: types_1.PlaceholderType.StaticDirective,
    categories: [types_1.PlaceholderCategory.Memory],
};
exports.default = DeletePersistentVariablePlaceholder;
