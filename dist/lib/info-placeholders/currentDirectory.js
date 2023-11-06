"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@raycast/utils");
const types_1 = require("../types");
/**
 * Placeholder for the current working directory. If the current application is not Finder, this placeholder will not be replaced.
 */
const CurrentDirectoryPlaceholder = {
    name: "currentDirectory",
    regex: /{{currentDirectory}}/g,
    apply: async () => {
        const dir = await (0, utils_1.runAppleScript)(`tell application "Finder" to return POSIX path of (insertion location as alias)`);
        return { result: dir, currentDirectory: dir };
    },
    result_keys: ["currentDirectory"],
    constant: true,
    fn: async () => (await CurrentDirectoryPlaceholder.apply("{{currentDirectory}}")).result,
    example: "Tell me about {{currentDirectory}}",
    description: "Replaced with the path of the current working directory in Finder.",
    hintRepresentation: "{{currentDirectory}}",
    fullRepresentation: "Current Directory Path",
    type: types_1.PlaceholderType.Informational,
    categories: [types_1.PlaceholderCategory.Files, types_1.PlaceholderCategory.Applications],
};
exports.default = CurrentDirectoryPlaceholder;
