"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
const scripts_1 = require("../scripts");
/**
 * Directive to select files. The placeholder will always be replaced with an empty string.
 */
const SelectFileDirective = {
    name: "selectFile",
    regex: /{{(selectFile)(:[\s\S]*?)?}}/g,
    apply: async (str) => {
        const file = str.match(/(?<=(selectFiles:))[\s\S]*?(?=}})/)?.[0];
        if (!file)
            return { result: "" };
        await (0, scripts_1.addFileToSelection)(file);
        return { result: "" };
    },
    constant: false,
    fn: async (path) => (await SelectFileDirective.apply(`{{selectFile:${path}}}`)).result,
    example: "{{selectFile:/Users/username/Desktop/file.txt}}",
    description: "Directive to a select file. The placeholder will always be replaced with an empty string.",
    hintRepresentation: "{{selectFile:...}}",
    fullRepresentation: "Select File At Path",
    type: types_1.PlaceholderType.InteractiveDirective,
    categories: [types_1.PlaceholderCategory.Files, types_1.PlaceholderCategory.Applications],
};
exports.default = SelectFileDirective;
