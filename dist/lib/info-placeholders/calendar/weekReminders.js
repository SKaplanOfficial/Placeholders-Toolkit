"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const scripts_1 = require("../../scripts");
const types_1 = require("../../types");
/**
 * Placeholder for a comma-separated list of the name and due date/time of all reminders that are scheduled over the next 7 days.
 */
const WeekRemindersPlaceholder = {
    name: "weekReminders",
    regex: /{{(weekReminders|weekTasks|weekTodos)}}/g,
    apply: async (str, context) => {
        if (context && "weekReminders" in context) {
            return {
                result: context["weekReminders"],
                weekReminders: context["weekReminders"],
            };
        }
        const reminders = await scripts_1.EventFetcher.getUpcomingEvents("reminder", 1);
        return { result: reminders, weekReminders: reminders };
    },
    result_keys: ["weekReminders"],
    constant: true,
    fn: async () => (await WeekRemindersPlaceholder.apply("{{weekReminders}}")).result,
    example: "Tell me about my reminders this week based on the following list: {{weekReminders}}.",
    description: "Replaced with a list of the name and due date/time of all reminders that are scheduled over the next 7 days.",
    hintRepresentation: "{{weekReminders}}",
    fullRepresentation: "This Week's Reminders",
    type: types_1.PlaceholderType.Informational,
    categories: [types_1.PlaceholderCategory.Calendar],
};
exports.default = WeekRemindersPlaceholder;
