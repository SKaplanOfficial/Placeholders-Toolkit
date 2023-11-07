"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
const scripts_1 = require("../scripts");
/**
 * Placeholder for the text of the most recently received email in Mail.app.
 */
const LastEmailPlaceholder = {
    name: "lastEmail",
    regex: /{{lastEmail}}/g,
    apply: async (str, context) => {
        if (context && "lastEmail" in context) {
            return {
                result: context["lastEmail"],
                lastEmail: context["lastEmail"],
            };
        }
        const email = await (0, scripts_1.getLastEmail)();
        return { result: email, lastEmail: email };
    },
    result_keys: ["lastEmail"],
    constant: true,
    fn: async () => (await LastEmailPlaceholder.apply("{{lastEmail}}")).result,
    example: "Summarize this: {{lastEmail}}",
    description: "Replaced with the text of the most recently received email in Mail.app.",
    hintRepresentation: "{{lastEmail}}",
    fullRepresentation: "Text of Last Email",
    type: types_1.PlaceholderType.Informational,
    categories: [types_1.PlaceholderCategory.Applications],
};
exports.default = LastEmailPlaceholder;
