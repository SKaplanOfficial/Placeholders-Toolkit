"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("@raycast/api");
const types_1 = require("../types");
/**
 * Placeholder for the name of the current application. Barring any issues, this should always be replaced.
 */
const CurrentAppNamePlaceholder = {
    name: "currentAppName",
    regex: /{{(currentAppName|currentApp|currentApplication|currentApplicationName)}}/g,
    apply: async () => {
        try {
            const app = (await (0, api_1.getFrontmostApplication)()).name || "";
            return { result: app, currentAppName: app };
        }
        catch (e) {
            return { result: "", currentAppName: "" };
        }
    },
    result_keys: ["currentAppName"],
    constant: true,
    fn: async () => (await CurrentAppNamePlaceholder.apply("{{currentAppName}}")).result,
    example: "Tell me about {{currentAppName}}",
    description: "Replaced with the name of the current application.",
    hintRepresentation: "{{currentAppName}}",
    fullRepresentation: "Current Application Name",
    type: types_1.PlaceholderType.Informational,
    categories: [types_1.PlaceholderCategory.Files, types_1.PlaceholderCategory.Applications],
};
exports.default = CurrentAppNamePlaceholder;
