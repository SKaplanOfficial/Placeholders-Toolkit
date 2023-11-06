"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("@raycast/api");
const types_1 = require("../types");
const utils_1 = require("../utils");
/**
 * Placeholder for the raw HTML of the first element matching the given selector in the active tab of a supported browser.
 */
const ElementHTMLPlaceholder = {
    name: "elementHTML",
    regex: /{{(HTMLOfElement|element|elementHTML)( browser="(.*)")?:(([^{]|{(?!{)|{{[\s\S]*?}})*?)}}/g,
    apply: async (str, context) => {
        try {
            const specifier = str.match(/{{(HTMLOfElement|element|elementHTML)( browser="(.*)")?:(([^{]|{(?!{)|{{[\s\S]*?}})*?)}}/)?.[4];
            if (!specifier)
                return { result: "" };
            const browser = str.match(/{{(HTMLOfElement|element|elementHTML)( browser="(.*)"):(([^{]|{(?!{)|{{[\s\S]*?}})*?)}}/)?.[3];
            const appName = browser
                ? browser
                : context?.["currentAppName"]
                    ? context["currentAppName"]
                    : (await (0, api_1.getFrontmostApplication)()).name;
            let js = `document.getElementById('${specifier}')?.outerHTML`;
            if (specifier.startsWith(".")) {
                js = `document.getElementsByClassName('${specifier.slice(1)}')[0]?.outerHTML`;
            }
            else if (specifier.startsWith("#")) {
                js = `document.getElementById('${specifier.slice(1)}')?.outerHTML`;
            }
            else if (specifier.startsWith("[")) {
                js = `document.querySelector('${specifier}')?.outerHTML`;
            }
            else if (specifier.startsWith("<") && specifier.endsWith(">")) {
                js = `document.getElementsByTagName('${specifier.slice(1, -1)}')[0]?.outerHTML`;
            }
            const elementHTML = await (0, utils_1.runJSInActiveTab)(js, appName);
            return { result: elementHTML };
        }
        catch (e) {
            return { result: "" };
        }
    },
    dependencies: ["currentAppName"],
    constant: false,
    fn: async (specifier, browser) => (await ElementHTMLPlaceholder.apply(`{{element${browser ? ` browser="${browser}"` : ``}:${specifier}}}`)).result,
    example: "Summarize this: {{elementHTML:#article}}",
    description: "Replaced with the raw HTML source of an HTML element in the active tab of any supported browser.",
    hintRepresentation: "{{elementHTML}}",
    fullRepresentation: "HTML of Browser Element With Specifier",
    type: types_1.PlaceholderType.InteractiveDirective,
    categories: [types_1.PlaceholderCategory.Internet],
};
exports.default = ElementHTMLPlaceholder;
