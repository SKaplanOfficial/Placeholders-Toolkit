"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("@raycast/api");
const types_1 = require("../../types");
/**
 * Directive to increment a persistent counter variable by 1. Returns the new value of the counter.
 */
const IncrementPersistentVariablePlaceholder = {
    name: "increment",
    regex: /{{increment:[\\s\\S]*?}}/g,
    apply: async (str) => {
        const name = str.match(/(?<=(increment:))[\s\S]*?(?=}})/)?.[0];
        const identifier = `id-${name}`;
        const value = parseInt((await api_1.LocalStorage.getItem(identifier)) || "0") + 1;
        await api_1.LocalStorage.setItem(identifier, value.toString());
        return { result: value.toString() };
    },
    constant: false,
    fn: async (id) => (await IncrementPersistentVariablePlaceholder.apply(`{{increment:${id}}}`))
        .result,
    example: "{{increment:counter}}",
    description: "Directive to increment a persistent counter variable by 1. Returns the new value of the counter.",
    hintRepresentation: "{{increment:x}}",
    fullRepresentation: "Increment Persistent Counter Variable",
    type: types_1.PlaceholderType.StaticDirective,
    categories: [types_1.PlaceholderCategory.Memory],
};
exports.default = IncrementPersistentVariablePlaceholder;
