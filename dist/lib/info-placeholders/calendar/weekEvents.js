"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const scripts_1 = require("../../scripts");
const types_1 = require("../../types");
/**
 * Placeholder for a comma-separated list of the name, start time, and end time of all calendar events that are scheduled over the next 7 days.
 */
const WeekEventsPlaceholder = {
    name: "weekEvents",
    regex: /{{weekEvents}}/g,
    apply: async (str, context) => {
        if (context && "weekEvents" in context) {
            return {
                result: context["weekEvents"],
                weekEvents: context["weekEvents"],
            };
        }
        const events = await scripts_1.EventFetcher.getUpcomingEvents("calendar", 1);
        return { result: events, weekEvents: events };
    },
    result_keys: ["weekEvents"],
    constant: true,
    fn: async () => (await WeekEventsPlaceholder.apply("{{weekEvents}}")).result,
    example: "Tell me about my events this week based on the following list: {{weekEvents}}.",
    description: "Replaced with a list of the name, start time, and end time of all calendar events scheduled over the next 7 days.",
    hintRepresentation: "{{weekEvents}}",
    fullRepresentation: "This Week's Calendar Events",
    type: types_1.PlaceholderType.Informational,
    categories: [types_1.PlaceholderCategory.Calendar],
};
exports.default = WeekEventsPlaceholder;
