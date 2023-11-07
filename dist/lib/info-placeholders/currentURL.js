"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
const utils_1 = require("../utils");
/**
 * Placeholder for the current URL in any supported browser. If the current application is not a supported browser, this placeholder will not be replaced.
 */
const CurrentURLPlaceholder = {
    name: "currentURL",
    regex: /{{(currentURL|currentTabURL)}}/g,
    apply: async (str, context) => {
        try {
            if (context &&
                "currentURL" in context &&
                context["currentURL"].length > 0) {
                return {
                    result: context["currentURL"],
                    currentURL: context["currentURL"],
                    currentAppName: context["currentAppName"],
                };
            }
            const app = await (0, utils_1.getActiveBrowser)();
            if (!app)
                return { result: "", currentURL: "", currentAppName: "" };
            const url = await app.currentURL();
            return { result: url, currentURL: url, currentAppName: app.name };
        }
        catch (e) {
            return { result: "", currentURL: "", currentAppName: "" };
        }
    },
    result_keys: ["currentURL", "currentAppName"],
    dependencies: ["currentAppName"],
    constant: true,
    fn: async () => (await CurrentURLPlaceholder.apply("{{currentURL}}")).result,
    example: "Tell me about {{currentURL}}",
    description: "Replaced with the URL of the current tab in any supported browser.",
    hintRepresentation: "{{currentURL}}",
    fullRepresentation: "URL of Current Browser Tab",
    type: types_1.PlaceholderType.Informational,
    categories: [types_1.PlaceholderCategory.Internet, types_1.PlaceholderCategory.Applications],
};
exports.default = CurrentURLPlaceholder;
