"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("@raycast/api");
const types_1 = require("../../types");
/**
 * Directive to display a toast or HUD with the provided text. The placeholder will always be replaced with an empty string. Whether a toast or HUD is displayed depends on the context (e.g. if the Raycast window is focused, a toast will be displayed; otherwise, a HUD will be displayed).
 *
 * Syntax: `{{toast style="[success/failure/fail]" title="...":Message}}` or `{{hud style="[success/failure/fail]" title="...":Message}}`
 *
 * The style and message are optional. If no style is provided, the style will be "success". If no message is provided, the message will be empty.
 */
const ToastDirective = {
    name: "toast",
    regex: /{{(toast|hud|HUD)( style="(success|failure|fail)")?( message="(([^{]|{(?!{)|{{[\s\S]*?}})*?)")?:(([^{]|{(?!{)|{{[\s\S]*?}})+?)}}/g,
    apply: async (str) => {
        const matches = str.match(/{(toast|hud|HUD)( style="(success|failure|fail)")?( message="(([^{]|{(?!{)|{{[\s\S]*?}})*?)")?:(([^{]|{(?!{)|{{[\s\S]*?}})+?)}}/);
        if (matches) {
            const style = matches[3] == "failure" || matches[3] == "fail"
                ? api_1.Toast.Style.Failure
                : api_1.Toast.Style.Success;
            const message = matches[5] || "";
            const title = matches[7];
            await (0, api_1.showToast)({ title: title, message: message, style: style });
        }
        return { result: "" };
    },
    constant: false,
    fn: async (message, style) => (await ToastDirective.apply(`{{toast${style ? ` style="${style}"` : ""}:${message}}}`)).result,
    example: '{{toast style="success":Done!}}',
    description: "Directive to display a toast or HUD with the provided text. The placeholder will always be replaced with an empty string. Whether a toast or HUD is displayed depends on the context (e.g. if the Raycast window is focused, a toast will be displayed; otherwise, a HUD will be displayed).",
    hintRepresentation: "{{toast:...}}",
    fullRepresentation: "Display Toast/HUD",
    type: types_1.PlaceholderType.InteractiveDirective,
    categories: [types_1.PlaceholderCategory.Alert],
};
exports.default = ToastDirective;
