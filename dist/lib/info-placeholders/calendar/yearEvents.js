"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const scripts_1 = require("../../scripts");
const types_1 = require("../../types");
/**
 * Placeholder for a comma-separated list of the name, start time, and end time of all calendar events that are scheduled over the next 365 days.
 */
const YearEventsPlaceholder = {
    name: "yearEvents",
    regex: /{{yearEvents}}/g,
    apply: async (str, context) => {
        if (context && "yearEvents" in context) {
            return {
                result: context["yearEvents"],
                yearEvents: context["yearEvents"],
            };
        }
        const events = await scripts_1.EventFetcher.getUpcomingEvents("calendar", 3);
        return { result: events, yearEvents: events };
    },
    result_keys: ["yearEvents"],
    constant: true,
    fn: async () => (await YearEventsPlaceholder.apply("{{yearEvents}}")).result,
    example: "Tell me about my events this year based on the following list: {{yearEvents}}.",
    description: "Replaced with a list of the name, start time, and end time of all calendar events scheduled over the next 365 days.",
    hintRepresentation: "{{yearEvents}}",
    fullRepresentation: "This Year's Calendar Events",
    type: types_1.PlaceholderType.Informational,
    categories: [types_1.PlaceholderCategory.Calendar],
};
exports.default = YearEventsPlaceholder;
