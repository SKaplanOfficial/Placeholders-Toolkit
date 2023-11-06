"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@raycast/utils");
const types_1 = require("../types");
/**
 * Placeholder for the list of names of all Siri Shortcuts on the current machine. The list is comma-separated.
 */
const ShortcutsPlaceholder = {
    name: "shortcuts",
    regex: /{{shortcuts}}/g,
    apply: async (str, context) => {
        const shortcuts = context && "shortcuts" in context
            ? context["shortcuts"]
            : await (0, utils_1.runAppleScript)(`tell application "Shortcuts Events" to return name of every shortcut`);
        return { result: shortcuts, shortcuts: shortcuts };
    },
    result_keys: ["shortcuts"],
    constant: true,
    fn: async () => (await ShortcutsPlaceholder.apply("{{shortcuts}}")).result,
    example: "Based on the following list, recommend some Siri Shortcuts for me to create: {{shortcuts}}",
    description: "Replaced with a comma-separated list of names of each Shortcut on the current machine.",
    hintRepresentation: "{{shortcuts}}",
    fullRepresentation: "List of Siri Shortcuts",
    type: types_1.PlaceholderType.Informational,
    categories: [types_1.PlaceholderCategory.Applications],
};
exports.default = ShortcutsPlaceholder;
