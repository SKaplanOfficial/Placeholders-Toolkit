"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const types_1 = require("../types");
/**
 * Placeholder for output of a JavaScript for Automation script. If the script fails, this placeholder will be replaced with an empty string. No sanitization is done in the script input; the expectation is that users will only use this placeholder with trusted scripts.
 */
const JXAPlaceholder = {
    name: "jxa",
    regex: /{{(jxa|JXA):(([^{]|{(?!{)|{{[\\s\\S]*?}})*?)}}/g,
    apply: async (str) => {
        try {
            const script = str.match(/(?<=(jxa|JXA):)(([^{]|{(?!{)|{{[\s\S]*?}})*?)}}/)?.[2];
            if (!script)
                return { result: "", jxa: "" };
            const res = (0, child_process_1.execSync)(`osascript -l JavaScript -e "${script
                .replaceAll('"', '\\"')
                .replaceAll("`", "\\`")
                .replaceAll("$", "\\$")
                .replaceAll(new RegExp(/[\n\r]/, "g"), " \\\n")}"`)
                .toString()
                .trim();
            return { result: res, jxa: res };
        }
        catch (e) {
            return { result: "", jxa: "" };
        }
    },
    constant: false,
    fn: async (script) => (await JXAPlaceholder.apply(`{{jxa:${script}}}`)).result,
    example: "{{jxa:Application('Music').currentTrack.name()}}",
    description: "Placeholder for output of a JavaScript for Automation script. If the script fails, this placeholder will be replaced with an empty string.",
    hintRepresentation: "{{jxa:...}}",
    fullRepresentation: "Run JXA Script",
    type: types_1.PlaceholderType.Script,
    categories: [types_1.PlaceholderCategory.Custom],
};
exports.default = JXAPlaceholder;
