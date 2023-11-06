"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@raycast/utils");
const types_1 = require("../types");
/**
 * Directive/placeholder to execute a Siri Shortcut by name, optionally supplying input, and insert the result. If the result is null, the placeholder will be replaced with an empty string.
 */
const ShortcutPlaceholder = {
    name: "shortcut",
    regex: /{{shortcut:([\s\S]+?)?(:[\s\S]*?)?}}/g,
    apply: async (str) => {
        const matches = str.match(/{{shortcut:([\s\S]+?)?(:[\s\S]*?)?}}/);
        if (matches) {
            const shortcutName = matches[1];
            const input = matches[2] ? matches[2].slice(1) : "";
            const result = await (0, utils_1.runAppleScript)(`tell application "Shortcuts Events"
        set res to run shortcut "${shortcutName}" with input "${input}"
        if res is not missing value then
          return res
        else
          return ""
        end if 
      end tell`);
            return { result: result || "" };
        }
        return { result: "" };
    },
    constant: false,
    fn: async (shortcut, input) => (await ShortcutPlaceholder.apply(`{{shortcut:${shortcut}${input?.length ? `:${input}` : ""}}}`)).result,
    example: "{{shortcut:My Shortcut:7}}",
    description: "Directive to execute a Siri Shortcut by name, optionally supplying input, and insert the result.",
    hintRepresentation: "{{shortcut:...}}",
    fullRepresentation: "Run Siri Shortcut",
    type: types_1.PlaceholderType.InteractiveDirective,
    categories: [types_1.PlaceholderCategory.Applications],
};
exports.default = ShortcutPlaceholder;
