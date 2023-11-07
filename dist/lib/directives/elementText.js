"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("@raycast/api");
const types_1 = require("../types");
const utils_1 = require("../utils");
/**
 * Placeholder for the text of the first element matching the given selector in the frontmost window of a supported browser.
 */
const ElementTextPlaceholder = {
    name: "elementText",
    regex: /{{(textOfElement|elementText)( browser="(.*)")?:(([^{]|{(?!{)|{{[\s\S]*?}})*?)}}/g,
    apply: async (str, context) => {
        try {
            const specifier = str.match(/{{(textOfElement|elementText)( browser="(.*)")?:(([^{]|{(?!{)|{{[\s\S]*?}})*?)}}/)?.[4];
            if (!specifier)
                return { result: "" };
            const browser = str.match(/{{(textOfElement|elementText)( browser="(.*)"):(([^{]|{(?!{)|{{[\s\S]*?}})*?)}}/)?.[3];
            const appName = browser
                ? browser
                : context?.["currentAppName"]
                    ? context["currentAppName"]
                    : (await (0, api_1.getFrontmostApplication)()).name;
            let js = `document.getElementById('${specifier}')?.innerText`;
            if (specifier.startsWith(".")) {
                js = `document.getElementsByClassName('${specifier.slice(1)}')[0]?.innerText`;
            }
            else if (specifier.startsWith("#")) {
                js = `document.getElementById('${specifier.slice(1)}')?.innerText`;
            }
            else if (specifier.startsWith("[")) {
                js = `document.querySelector('${specifier}')?.innerText`;
            }
            else if (specifier.startsWith("<") && specifier.endsWith(">")) {
                js = `document.getElementsByTagName('${specifier.slice(1, -1)}')[0]?.innerText`;
            }
            const elementText = await (0, utils_1.runJSInActiveTab)(js, appName);
            return { result: elementText };
        }
        catch (e) {
            return { result: "" };
        }
    },
    dependencies: ["currentAppName"],
    constant: false,
    fn: async (specifier, browser) => (await ElementTextPlaceholder.apply(`{{elementText${browser ? ` browser="${browser}"` : ``}:${specifier}}}`)).result,
    example: "Summarize this: {{elementText:#article}}",
    description: "Replaced with the text content of an HTML element in the active tab of any supported browser.",
    hintRepresentation: "{{elementText}}",
    fullRepresentation: "Text of Browser Element With Specifier",
    type: types_1.PlaceholderType.InteractiveDirective,
    categories: [types_1.PlaceholderCategory.Internet],
};
exports.default = ElementTextPlaceholder;
