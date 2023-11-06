"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const browsers_1 = require("../browsers");
const types_1 = require("../types");
/**
 * Placeholder for the comma-separated list of titles and URLs of the most frequently visited websites in Safari, obtained via plist.
 */
const SafariTopSitesPlaceholder = {
    name: "safariTopSites",
    regex: /{{safariTopSites}}/g,
    apply: async (str, context) => {
        if (context && "safariTopSites" in context) {
            return { result: context["safariTopSites"], safariTopSites: context["safariTopSites"] };
        }
        const sites = (await browsers_1.Safari.topSites()).join(", ");
        return { result: sites, safariTopSites: sites };
    },
    result_keys: ["safariTopSites"],
    constant: true,
    fn: async () => (await SafariTopSitesPlaceholder.apply("{{safariTopSites}}")).result,
    example: "Based on this list of websites, suggest some new ones I might like: {{safariTopSites}}",
    description: "Replaced with the comma-separated list of titles and URLs of the most frequently visited websites in Safari.",
    hintRepresentation: "{{safariTopSites}}",
    fullRepresentation: "Safari Top Sites",
    type: types_1.PlaceholderType.Informational,
    categories: [types_1.PlaceholderCategory.Applications],
};
exports.default = SafariTopSitesPlaceholder;
