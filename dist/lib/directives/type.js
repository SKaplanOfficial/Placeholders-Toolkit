"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@raycast/utils");
const types_1 = require("../types");
const api_1 = require("@raycast/api");
/**
 * Directive to type the provided text in the frontmost application. The placeholder will always be replaced with an empty string.
 */
const TypeDirective = {
    name: "type",
    regex: /{{type:(([^{]|{(?!{)|{{[\s\S]*?}})*?)}}/g,
    apply: async (str) => {
        const text = str.match(/(?<=(type:))(([^{]|{(?!{)|{{[\s\S]*?}})*?)(?=}})/)?.[0];
        if (!text)
            return { result: "" };
        await (0, api_1.showHUD)("Typing Into Frontmost App");
        await (0, utils_1.runAppleScript)(`tell application "System Events" to keystroke "${text}"`);
        return { result: "" };
    },
    constant: false,
    fn: async (text) => (await TypeDirective.apply(`{{type:${text}}}`)).result,
    example: "{{type:Hello World}}",
    description: "Directive to type the provided text in the frontmost application. The placeholder will always be replaced with an empty string.",
    hintRepresentation: "{{type:...}}",
    fullRepresentation: "Type Text",
    type: types_1.PlaceholderType.InteractiveDirective,
    categories: [types_1.PlaceholderCategory.Device, types_1.PlaceholderCategory.Applications],
};
exports.default = TypeDirective;
