"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const scripts_1 = require("../scripts");
const types_1 = require("../types");
/**
 * Placeholder for the paths of the currently selected files in Finder as a comma-separated list. If no files are selected, this will be replaced with an empty string.
 */
const SelectedFilesPlaceholder = {
    name: "selectedFiles",
    regex: /{{(selectedFiles|selectedFile|files)}}/g,
    apply: async (str, context) => {
        if (!context || !("selectedFiles" in context))
            return { result: "", selectedFiles: "" };
        try {
            const files = context && "selectedFiles" in context
                ? context["selectedFiles"]
                : (await (0, scripts_1.getSelectedFiles)()).csv;
            return { result: files, selectedFiles: files };
        }
        catch (e) {
            return { result: "", selectedFiles: "" };
        }
    },
    result_keys: ["selectedFiles"],
    constant: true,
    fn: async () => (await SelectedFilesPlaceholder.apply("{{selectedFiles}}")).result,
    example: "Count the number of text files in this list: {{selectedFiles}}",
    description: "Replaced with the paths of the currently selected files in Finder as a comma-separated list. If no files are selected, this will be replaced with an empty string.",
    hintRepresentation: "{{selectedFiles}}",
    fullRepresentation: "Selected File Paths",
    type: types_1.PlaceholderType.Informational,
    categories: [types_1.PlaceholderCategory.Files],
};
exports.default = SelectedFilesPlaceholder;
