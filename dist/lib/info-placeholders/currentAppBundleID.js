"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("@raycast/api");
const types_1 = require("../types");
/**
 * Placeholder for the bundle ID of the current application.
 */
const CurrentAppBundleIDPlaceholder = {
    name: "currentAppBundleID",
    regex: /{{(currentAppBundleID|currentApplicationBundleID)}}/g,
    apply: async () => {
        try {
            const id = (await (0, api_1.getFrontmostApplication)()).bundleId || "";
            return { result: id, currentAppBundleID: id };
        }
        catch (e) {
            return { result: "", currentAppBundleID: "" };
        }
    },
    result_keys: ["currentAppBundleID"],
    constant: true,
    fn: async () => (await CurrentAppBundleIDPlaceholder.apply("{{currentAppBundleID}}"))
        .result,
    example: "Tell me about {{currentAppBundleID}}",
    description: "Replaced with the bundle ID of the current application.",
    hintRepresentation: "{{currentAppBundleID}}",
    fullRepresentation: "Current Application Bundle ID",
    type: types_1.PlaceholderType.Informational,
    categories: [types_1.PlaceholderCategory.Files, types_1.PlaceholderCategory.Applications],
};
exports.default = CurrentAppBundleIDPlaceholder;
