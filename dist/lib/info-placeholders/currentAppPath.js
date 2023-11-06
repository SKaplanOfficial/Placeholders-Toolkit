"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("@raycast/api");
const types_1 = require("../types");
/**
 * Placeholder for the path of the current application. Barring any issues, this should always be replaced.
 */
const CurrentAppPathPlaceholder = {
    name: "currentAppPath",
    regex: /{{(currentAppPath|currentApplicationPath)}}/g,
    apply: async () => {
        try {
            const appPath = (await (0, api_1.getFrontmostApplication)()).path || "";
            return { result: appPath, currentAppPath: appPath };
        }
        catch (e) {
            return { result: "", currentAppPath: "" };
        }
    },
    result_keys: ["currentAppPath"],
    constant: true,
    fn: async () => (await CurrentAppPathPlaceholder.apply("{{currentAppPath}}")).result,
    example: "Tell me about {{currentAppPath}}",
    description: "Replaced with the path of the current application.",
    hintRepresentation: "{{currentAppPath}}",
    fullRepresentation: "Current Application Path",
    type: types_1.PlaceholderType.Informational,
    categories: [types_1.PlaceholderCategory.Files, types_1.PlaceholderCategory.Applications],
};
exports.default = CurrentAppPathPlaceholder;
