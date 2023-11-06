"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const scripts_1 = require("../scripts");
const types_1 = require("../types");
/**
 * Place holder for the names of the currently selected files in Finder as a comma-separated list.
 */
const FileNamesPlaceholder = {
    name: "fileNames",
    regex: /{{fileNames}}/g,
    apply: async (str, context) => {
        const files = context && "selectedFiles" in context
            ? context["selectedFiles"]
            : (await (0, scripts_1.getSelectedFiles)()).csv;
        if (files.length == 0)
            return { result: "", fileNames: "", selectedFiles: "" };
        const fileNames = files
            .split(", ")
            .map((file) => file.split("/").pop())
            .join(", ");
        return { result: fileNames, fileNames: fileNames, selectedFiles: files };
    },
    result_keys: ["fileNames", "selectedFiles"],
    constant: true,
    fn: async () => (await FileNamesPlaceholder.apply("{{fileNames}}")).result,
    example: "Sort this list of files by name: {{fileNames}}",
    description: "Replaced with the names of the currently selected files in Finder as a comma-separated list. If no files are selected, this will be replaced with an empty string.",
    hintRepresentation: "{{fileNames}}",
    fullRepresentation: "Selected File Names",
    type: types_1.PlaceholderType.Informational,
    categories: [types_1.PlaceholderCategory.Files],
};
exports.default = FileNamesPlaceholder;
