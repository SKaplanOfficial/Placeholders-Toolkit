"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("@raycast/api");
const types_1 = require("../types");
/**
 * Placeholder for the text currently stored in the clipboard. If the clipboard is empty, this will be replaced with an empty string. Most clipboard content supplies a string format, such as file names when copying files in Finder.
 */
const ClipboardTextPlaceholder = {
    name: "clipboardText",
    regex: /{{(clipboardText|clipboard)}}/g,
    apply: async (_, context) => {
        if (context?.["clipboardText"]?.toString().length) {
            return { result: context["clipboardText"], clipboardText: context["clipboardText"] };
        }
        try {
            const text = (await api_1.Clipboard.readText()) || "";
            return { result: text, clipboardText: text };
        }
        catch (e) {
            return { result: "", clipboardText: "" };
        }
    },
    result_keys: ["clipboardText"],
    constant: true,
    fn: async () => (await ClipboardTextPlaceholder.apply("{{clipboardText}}")).result,
    example: "Summarize this: {{clipboardText}}",
    description: "Replaced with the text currently stored in the clipboard. If the clipboard is empty, this will be replaced with an empty string. Most clipboard content supplies a string format, such as file names when copying files in Finder.",
    hintRepresentation: "{{clipboardText}}",
    fullRepresentation: "Clipboard Text",
    type: types_1.PlaceholderType.Informational,
    categories: [types_1.PlaceholderCategory.Device],
};
exports.default = ClipboardTextPlaceholder;
