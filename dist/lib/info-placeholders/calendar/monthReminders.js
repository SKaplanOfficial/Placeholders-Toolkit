"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const scripts_1 = require("../../scripts");
const types_1 = require("../../types");
/**
 * Placeholder for a comma-separated list of the name and due date/time of all reminders that are scheduled over the next 30 days.
 */
const MonthRemindersPlaceholder = {
    name: "monthReminders",
    regex: /{{(monthReminders|monthTasks|monthTodos)}}/g,
    apply: async (str, context) => {
        if (context && "monthReminders" in context) {
            return {
                result: context["monthReminders"],
                monthReminders: context["monthReminders"],
            };
        }
        const reminders = await scripts_1.EventFetcher.getUpcomingEvents("reminder", 2);
        return { result: reminders, monthReminders: reminders };
    },
    result_keys: ["monthReminders"],
    constant: true,
    fn: async () => (await MonthRemindersPlaceholder.apply("{{monthReminders}}")).result,
    example: "Tell me about my reminders this month based on the following list: {{monthReminders}}.",
    description: "Replaced with a list of the name and due date/time of all reminders that are scheduled over the next 30 days.",
    hintRepresentation: "{{monthReminders}}",
    fullRepresentation: "This Month's Reminders",
    type: types_1.PlaceholderType.Informational,
    categories: [types_1.PlaceholderCategory.Calendar],
};
exports.default = MonthRemindersPlaceholder;
