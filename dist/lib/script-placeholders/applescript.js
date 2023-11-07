"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@raycast/utils");
const types_1 = require("../types");
/**
 * Placeholder for output of an AppleScript script. If the script fails, this placeholder will be replaced with an empty string. No sanitization is done in the script input; the expectation is that users will only use this placeholder with trusted scripts.
 */
const AppleScriptPlaceholder = {
    name: "as",
    regex: /{{(as|AS):(([^{]|{(?!{)|{{[\\s\\S]*?}})*?)}}/g,
    apply: async (str) => {
        try {
            const script = str.match(/(as|AS):(([^{]|{(?!{)|{{[\s\S]*?}})*?)}}/)?.[2];
            if (!script)
                return { result: "", applescript: "" };
            const res = (await (0, utils_1.runAppleScript)(script)).trim();
            return { result: res, applescript: res };
        }
        catch (e) {
            return { result: "", applescript: "" };
        }
    },
    constant: false,
    fn: async (script) => (await AppleScriptPlaceholder.apply(`{{as:${script}}}`)).result,
    example: '{{as:display dialog "Hello World"}}',
    description: "Placeholder for output of an AppleScript script. If the script fails, this placeholder will be replaced with an empty string.",
    hintRepresentation: "{{as:...}}",
    fullRepresentation: "Run AppleScript",
    type: types_1.PlaceholderType.Script,
    categories: [types_1.PlaceholderCategory.Custom],
};
exports.default = AppleScriptPlaceholder;
