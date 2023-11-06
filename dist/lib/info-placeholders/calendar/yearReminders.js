"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const scripts_1 = require("../../scripts");
const types_1 = require("../../types");
/**
 * Placeholder for a comma-separated list of the name and due date/time of all reminders that are scheduled over the next 365 days.
 */
const YearRemindersPlaceholder = {
    name: "yearReminders",
    regex: /{{(yearReminders|yearTasks|yearTodos)}}/g,
    apply: async (str, context) => {
        if (context && "yearReminders" in context) {
            return {
                result: context["yearReminders"],
                yearReminders: context["yearReminders"],
            };
        }
        const reminders = await scripts_1.EventFetcher.getUpcomingEvents("reminder", 3);
        return { result: reminders, yearReminders: reminders };
    },
    result_keys: ["yearReminders"],
    constant: true,
    fn: async () => (await YearRemindersPlaceholder.apply("{{yearReminders}}")).result,
    example: "Tell me about my reminders this year based on the following list: {{yearReminders}}.",
    description: "Replaced with a list of the name and due date/time of all reminders that are scheduled over the next 365 days.",
    hintRepresentation: "{{yearReminders}}",
    fullRepresentation: "This Year's Reminders",
    type: types_1.PlaceholderType.Informational,
    categories: [types_1.PlaceholderCategory.Calendar],
};
exports.default = YearRemindersPlaceholder;
