"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
/**
 * Placeholder for output of a JavaScript script. If the script fails, this placeholder will be replaced with an empty string. The script is run in a sandboxed environment.
 */
const JavaScriptPlaceholder = {
    name: "js",
    regex: /{{(js|JS)( target="(.*?)")?:(([^{]|{(?!{)|{{[\\s\\S]*?}})*?)}}/g,
    apply: async () => {
        return { result: "", js: "" };
    },
    constant: false,
    fn: async (script, target) => (await JavaScriptPlaceholder.apply(`{{js${target == undefined ? `` : ` target="${target}"`}:${script}}}`)).result,
    example: '{{js:log("Hello World")}}',
    description: "Placeholder for output of a JavaScript script. If the script fails, this placeholder will be replaced with an empty string. The script is run in a sandboxed environment.",
    hintRepresentation: "{{js:...}}",
    fullRepresentation: "Run JavaScript",
    type: types_1.PlaceholderType.Script,
    categories: [types_1.PlaceholderCategory.Custom],
};
exports.default = JavaScriptPlaceholder;
