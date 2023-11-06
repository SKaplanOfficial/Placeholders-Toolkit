"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@raycast/utils");
const types_1 = require("../../types");
/**
 * Directive to speak the provided text. The placeholder will always be replaced with an empty string.
 *
 * Syntax: `{{say voice="[voice]" speed=[number] pitch=[number] volume=[number]:Message}}`
 *
 * All arguments are optional. If no voice, speed, pitch, or volume are provided, the system defaults will be used.
 */
const SayDirective = {
    name: "say",
    regex: /{{say( voice="[A-Za-z)( ._-]")?( speed=[0-9.]+?)?( pitch=([0-9.]+?))?( volume=[0-9.]+?)?:(([^{]|{(?!{)|{{[\s\S]*?}})+?)}}/g,
    apply: async (str) => {
        const matches = str.match(/{{say( voice="([A-Za-z)( ._-]+?)")?( speed=([0-9.]+?))?( pitch=([0-9.]+?))?( volume=([0-9.]+?))?:(([^{]|{(?!{)|{{[\s\S]*?}})+?)}}/);
        if (matches) {
            const voice = matches[2] || undefined;
            const speed = matches[4] || undefined;
            const pitch = matches[6] || undefined;
            const volume = matches[8] || undefined;
            const query = matches[9];
            await (0, utils_1.runAppleScript)(`say "${query}"${voice ? ` using "${voice}"` : ""}${speed ? ` speaking rate ${speed}` : ""}${pitch ? ` pitch ${pitch}` : ""}${volume ? ` volume ${volume}` : ""}`);
        }
        return { result: "" };
    },
    constant: false,
    fn: async (message, voice, speed, pitch, volume) => (await SayDirective.apply(`{{say${voice ? ` voice="${voice}"` : ""}${speed ? ` speed="${speed}"` : ""}${pitch ? ` pitch="${pitch}"` : ""}${volume ? ` volume="${volume}"` : ""}:${message}}}`)).result,
    example: "{{say:Hello World}}",
    description: "Directive to speak the provided text. The placeholder will always be replaced with an empty string.",
    hintRepresentation: "{{say:...}}",
    fullRepresentation: "Speak Text",
    type: types_1.PlaceholderType.InteractiveDirective,
    categories: [types_1.PlaceholderCategory.Alert],
};
exports.default = SayDirective;
