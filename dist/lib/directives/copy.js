"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("@raycast/api");
const types_1 = require("../types");
/**
 * Directive to copy the provided text to the clipboard. The placeholder will always be replaced with an empty string.
 */
const CopyDirective = {
    name: "copy",
    regex: /{{(copy):[\s\S]*?}}/g,
    apply: async (str) => {
        const text = str.match(/(?<=(copy:))[\s\S]*?(?=}})/)?.[0];
        if (!text)
            return { result: "" };
        await api_1.Clipboard.copy(text);
        if (api_1.environment.commandName == "index") {
            await (0, api_1.showHUD)("Copied to Clipboard");
        }
        else {
            await (0, api_1.showToast)({ title: "Copied to Clipboard" });
        }
        return { result: "" };
    },
    constant: false,
    fn: async (text) => (await CopyDirective.apply(`{{copy:${text}}}`)).result,
    example: "{{copy:Hello World}}",
    description: "Directive to copy the provided text to the clipboard. The placeholder will always be replaced with an empty string.",
    hintRepresentation: "{{copy:...}}",
    fullRepresentation: "Copy To Clipboard",
    type: types_1.PlaceholderType.InteractiveDirective,
    categories: [types_1.PlaceholderCategory.Device, types_1.PlaceholderCategory.Applications],
};
exports.default = CopyDirective;
