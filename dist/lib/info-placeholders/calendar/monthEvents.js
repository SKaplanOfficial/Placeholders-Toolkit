"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const scripts_1 = require("../../scripts");
const types_1 = require("../../types");
/**
 * Placeholder for a comma-separated list of the name, start time, and end time of all calendar events that are scheduled over the next 30 days.
 */
const MonthEventsPlaceholder = {
    name: "monthEvents",
    regex: /{{monthEvents}}/g,
    apply: async (str, context) => {
        if (context && "monthEvents" in context) {
            return {
                result: context["monthEvents"],
                monthEvents: context["monthEvents"],
            };
        }
        const events = await scripts_1.EventFetcher.getUpcomingEvents("calendar", 2);
        return { result: events, monthEvents: events };
    },
    result_keys: ["monthEvents"],
    constant: true,
    fn: async () => (await MonthEventsPlaceholder.apply("{{monthEvents}}")).result,
    example: "Tell me about my events this month based on the following list: {{monthEvents}}.",
    description: "Replaced with a list of the name, start time, and end time of all calendar events scheduled over the next 30 days.",
    hintRepresentation: "{{monthEvents}}",
    fullRepresentation: "This Month's Calendar Events",
    type: types_1.PlaceholderType.Informational,
    categories: [types_1.PlaceholderCategory.Calendar],
};
exports.default = MonthEventsPlaceholder;
