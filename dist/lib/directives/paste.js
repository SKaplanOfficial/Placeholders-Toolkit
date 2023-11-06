"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("@raycast/api");
const types_1 = require("../types");
/**
 * Directive to paste the provided text in the frontmost application. The placeholder will always be replaced with an empty string.
 */
const PasteDirective = {
    name: "paste",
    regex: /{{(paste):[\s\S]*?}}/g,
    apply: async (str) => {
        const text = str.match(/(?<=(paste:))[\s\S]*?(?=}})/)?.[0];
        if (!text)
            return { result: "" };
        await api_1.Clipboard.paste(text);
        await (0, api_1.showHUD)("Pasted Into Frontmost App");
        return { result: "" };
    },
    constant: false,
    fn: async (text) => (await PasteDirective.apply(`{{paste:${text}}}`)).result,
    example: "{{paste:Hello World}}",
    description: "Directive to paste the provided text in the frontmost application. The placeholder will always be replaced with an empty string.",
    hintRepresentation: "{{paste:...}}",
    fullRepresentation: "Paste From Clipboard",
    type: types_1.PlaceholderType.InteractiveDirective,
    categories: [types_1.PlaceholderCategory.Device, types_1.PlaceholderCategory.Applications],
};
exports.default = PasteDirective;
