"use strict";
/**
 * Placeholder for the text of the focused element in the frontmost window of a supported browser.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("@raycast/api");
const types_1 = require("../types");
const utils_1 = require("../utils");
const FocusedElementPlaceholder = {
    name: "focusedElement",
    regex: /{{(focusedElement|activeElement|selectedElement|focusedElementText|activeElementText|selectedElementText)( browser="([a-zA-Z]*)")?}}/g,
    apply: async (str, context) => {
        try {
            const browser = str.match(/(focusedElement|activeElement|selectedElement|focusedElementText|activeElementText|selectedElementText)( browser=")(.*?)(")?/)?.[3];
            const appName = browser
                ? browser
                : context?.["currentAppName"]
                    ? context["currentAppName"]
                    : (await (0, api_1.getFrontmostApplication)()).name;
            const js = `document.querySelector('div:hover').innerText`;
            const elementText = await (0, utils_1.runJSInActiveTab)(js, appName);
            return { result: elementText };
        }
        catch (e) {
            return { result: "" };
        }
    },
    dependencies: ["currentAppName"],
    constant: false,
    fn: async (browser) => (await FocusedElementPlaceholder.apply(`{{focusedElement browser="${browser}"}}`)).result,
    example: 'Summarize this: {{focusedElement browser="Safari"}}',
    description: "Replaced with the text content of the currently focused HTML element in the active tab of the given browser. If no browser is specified, the frontmost browser is used.",
    hintRepresentation: "{{focusedElement}}",
    fullRepresentation: "Text of Focused Browser Element",
    type: types_1.PlaceholderType.InteractiveDirective,
    categories: [types_1.PlaceholderCategory.Internet],
};
exports.default = FocusedElementPlaceholder;
