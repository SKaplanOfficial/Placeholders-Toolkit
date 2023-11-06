"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("@raycast/api");
const types_1 = require("../../types");
/**
   * Directive to decrement a persistent counter variable by 1. Returns the new value of the counter.
   */
const DecrementPersistentVariablePlaceholder = {
    name: "decrement",
    regex: /{{decrement:[\\s\\S]*?}}/g,
    apply: async (str) => {
        const name = str.match(/(?<=(decrement:))[\s\S]*?(?=}})/)?.[0];
        const identifier = `id-${name}`;
        const value = parseInt((await api_1.LocalStorage.getItem(identifier)) || "0") + 1;
        await api_1.LocalStorage.setItem(identifier, value.toString());
        return { result: value.toString() };
    },
    constant: false,
    fn: async (id) => (await DecrementPersistentVariablePlaceholder.apply(`{{decrement:${id}}}`)).result,
    example: "{{decrement:counter}}",
    description: "Directive to decrement a persistent counter variable by 1.",
    hintRepresentation: "{{decrement:x}}",
    fullRepresentation: "Decrement Persistent Counter Variable",
    type: types_1.PlaceholderType.StaticDirective,
    categories: [types_1.PlaceholderCategory.Memory],
};
exports.default = DecrementPersistentVariablePlaceholder;
