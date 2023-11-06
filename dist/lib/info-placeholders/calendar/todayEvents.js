"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const scripts_1 = require("../../scripts");
const types_1 = require("../../types");
/**
 * Placeholder for a comma-separated list of the name, start time, and end time of all calendar events that are scheduled over the next 24 hours.
 */
const TodayEventsPlaceholder = {
    name: "todayEvents",
    regex: /{{todayEvents}}/g,
    apply: async (str, context) => {
        if (context && "todayEvents" in context) {
            return {
                result: context["todayEvents"],
                todayEvents: context["todayEvents"],
            };
        }
        const events = await scripts_1.EventFetcher.getUpcomingEvents("calendar", 0);
        return { result: events, todayEvents: events };
    },
    result_keys: ["todayEvents"],
    constant: true,
    fn: async () => (await TodayEventsPlaceholder.apply("{{todayEvents}}")).result,
    example: "Tell me about my events today based on the following list: {{todayEvents}}.",
    description: "Replaced with a list of the name, start time, and end time of all calendar events scheduled over the 24 hours.",
    hintRepresentation: "{{todayEvents}}",
    fullRepresentation: "Today's Calendar Events",
    type: types_1.PlaceholderType.Informational,
    categories: [types_1.PlaceholderCategory.Calendar],
};
exports.default = TodayEventsPlaceholder;
