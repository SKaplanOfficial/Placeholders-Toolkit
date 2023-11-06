"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("@raycast/api");
const types_1 = require("../types");
/**
 * Placeholder for the currently selected text. If no text is selected, this will be replaced with an empty string.
 */
const SelectedTextPlaceholder = {
    name: "selectedText",
    regex: /{{selectedText}}/g,
    apply: async () => {
        try {
            const text = await (0, api_1.getSelectedText)();
            return { result: text, selectedText: text };
        }
        catch (e) {
            return { result: "", selectedText: "" };
        }
    },
    result_keys: ["selectedText"],
    constant: true,
    fn: async () => (await SelectedTextPlaceholder.apply("{{selectedText}}")).result,
    example: "Rewrite this as a list: {{selectedText}}",
    description: "Replaced with the currently selected text. If no text is selected, this will be replaced with an empty string.",
    hintRepresentation: "{{selectedText}}",
    fullRepresentation: "Selected Text",
    type: types_1.PlaceholderType.Informational,
    categories: [types_1.PlaceholderCategory.Device],
};
exports.default = SelectedTextPlaceholder;
