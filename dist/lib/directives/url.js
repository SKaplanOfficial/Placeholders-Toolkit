"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
const utils_1 = require("../utils");
/**
 * Placeholder for the visible text content at a given URL.
 */
const URLPlaceholder = {
    name: "url",
    regex: /{{((url|URL)( raw=(true|false))?:.*?|https?:\/?\/?[\s\S]*?)}}/g,
    apply: async (str) => {
        try {
            const URL = str.match(/(url|URL)( raw=(true|false))?:(([^{]|{(?!{)|{{[\s\S]*?}})*?)}}/)?.[4] ||
                str.match(/https?:[\s\S]*?(?=}})/)?.[0] ||
                "";
            const raw = str.match(/(url|URL)( raw=(true|false))?:(([^{]|{(?!{)|{{[\s\S]*?}})*?)}}/)?.[3] === "true";
            if (!URL)
                return { result: "", url: "" };
            const urlText = raw ? await (0, utils_1.getURLHTML)(URL) : await (0, utils_1.getTextOfWebpage)(URL);
            return { result: urlText, url: urlText };
        }
        catch (e) {
            return { result: "", url: "" };
        }
    },
    constant: false,
    fn: async (url) => {
        return (await URLPlaceholder.apply(`{{url:${url}}}`)).result;
    },
    example: "{{url:https://www.google.com}}",
    description: "Placeholder for the visible text content at a given URL. Accepts an optional `raw` parameter, e.g. `{{url:https://www.google.com raw=true}}`, to return the raw HTML of the page instead of the visible text.",
    hintRepresentation: "{{url:...}}",
    fullRepresentation: "Visible Text at URL",
    type: types_1.PlaceholderType.InteractiveDirective,
    categories: [types_1.PlaceholderCategory.Internet],
};
exports.default = URLPlaceholder;
