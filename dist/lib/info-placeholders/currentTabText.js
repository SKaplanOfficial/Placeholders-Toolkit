"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
const utils_1 = require("../utils");
/**
 * Placeholder for the visible text of the current tab in any supported browser. If the current application is not a supported browser, this placeholder will not be replaced.
 */
const CurrentTabTextPlaceholder = {
    name: "currentTabText",
    regex: /{{(currentTabText|tabText)}}/g,
    apply: async (str, context) => {
        const data = {
            result: context?.["currentTabText"] || "",
            currentTabText: context?.["currentTabText"] || "",
            currentAppName: context?.["currentAppName"] || "",
            activeBrowser: context?.["activeBrowser"] || null,
        };
        if (data.result.length > 0)
            return data;
        try {
            const app = (data.activeBrowser || (await (0, utils_1.getActiveBrowser)()));
            const tabText = await app?.currentTabText();
            if (app && tabText) {
                data.result = tabText;
                data.currentTabText = tabText;
                data.currentAppName = app.name;
                data.activeBrowser = app;
            }
        }
        catch (e) {
            console.error(e);
        }
        return data;
    },
    result_keys: ["currentTabText", "currentAppName"],
    dependencies: ["currentAppName"],
    constant: true,
    fn: async () => (await CurrentTabTextPlaceholder.apply("{{currentTabText}}")).result,
    example: "Summarize this: {{currentTabText}}",
    description: "Replaced with the visible text of the current tab in any supported browser.",
    hintRepresentation: "{{currentTabText}}",
    fullRepresentation: "Text of Current Browser Tab",
    type: types_1.PlaceholderType.Informational,
    categories: [types_1.PlaceholderCategory.Internet, types_1.PlaceholderCategory.Applications],
};
exports.default = CurrentTabTextPlaceholder;
