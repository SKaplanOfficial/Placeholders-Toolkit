"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
/**
 * Placeholder for the contents of the currently selected files in Finder.
 */
const FileContentsPlaceholder = {
    name: "contents",
    regex: /{{(selectedFileContents|selectedFilesContents|selectedFileContent|selectedFilesContent|selectedFileText|selectedFilesText|contents)}}/g,
    apply: async (str, context) => {
        const contents = context && "contents" in context ? context["contents"] : "";
        return { result: contents, contents: contents };
    },
    result_keys: ["contents"],
    constant: true,
    fn: async () => (await FileContentsPlaceholder.apply("{{contents}}")).result,
    example: "Identify the common theme among these files: {{contents}}",
    description: "Replaced with the extracted contents of the currently selected files in Finder. Clarifying text is added to identify each type of information.",
    hintRepresentation: "{{contents}}",
    fullRepresentation: "Selected File Contents",
    type: types_1.PlaceholderType.Informational,
    categories: [types_1.PlaceholderCategory.Files],
};
exports.default = FileContentsPlaceholder;
