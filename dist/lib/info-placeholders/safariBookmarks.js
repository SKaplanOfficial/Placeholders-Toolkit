"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const browsers_1 = require("../browsers");
const types_1 = require("../types");
/**
 * Placeholder for the comma-separated list of titles and URLs of all bookmarks in Safari, obtained via plist.
 */
const SafariBookmarksPlaceholder = {
    name: "safariBookmarks",
    regex: /{{safariBookmarks}}/g,
    apply: async (str, context) => {
        if (context && "safariBookmarks" in context) {
            return {
                result: context["safariBookmarks"],
                safariBookmarks: context["safariBookmarks"],
            };
        }
        const sites = (await browsers_1.Safari.bookmarks(20)).join(", ");
        return { result: sites, safariBookmarks: sites };
    },
    result_keys: ["safariBookmarks"],
    constant: true,
    fn: async () => (await SafariBookmarksPlaceholder.apply("{{safariBookmarks}}")).result,
    example: "Based on this list of websites, suggest some new ones I might like: {{safariBookmarks}}",
    description: "Replaced with the comma-separated list of titles and URLs of bookmarks in Safari.",
    hintRepresentation: "{{safariBookmarks}}",
    fullRepresentation: "Safari Bookmarks",
    type: types_1.PlaceholderType.Informational,
    categories: [types_1.PlaceholderCategory.Applications],
};
exports.default = SafariBookmarksPlaceholder;
