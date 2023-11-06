"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
const scripts_1 = require("../scripts");
/**
 * Placeholder for the HTML text of the most recently edited note in Notes.app.
 */
const LastNotePlaceholder = {
    name: "lastNote",
    regex: /{{lastNote}}/g,
    apply: async (str, context) => {
        if (context && "lastNote" in context) {
            return { result: context["lastNote"], lastNote: context["lastNote"] };
        }
        const note = await (0, scripts_1.getLastNote)();
        return { result: note, lastNote: note };
    },
    result_keys: ["lastNote"],
    constant: true,
    fn: async () => (await LastNotePlaceholder.apply("{{lastNote}}")).result,
    example: "Summarize this: {{lastNote}}",
    description: "Replaced with the HTML text of the most recently edited note in Notes.app.",
    hintRepresentation: "{{lastNote}}",
    fullRepresentation: "Text of Last Note",
    type: types_1.PlaceholderType.Informational,
    categories: [types_1.PlaceholderCategory.Applications],
};
exports.default = LastNotePlaceholder;
