"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const scripts_1 = require("../../scripts");
const types_1 = require("../../types");
/**
 * Placeholder for a comma-separated list of the name and due date/time of all reminders that are scheduled over the next 24 hours.
 */
const TodayRemindersPlaceholder = {
    name: "todayReminders",
    regex: /{{(todayReminders|todayTasks|todayTodos)}}/g,
    apply: async (str, context) => {
        if (context && "todayReminders" in context) {
            return {
                result: context["todayReminders"],
                todayReminders: context["todayReminders"],
            };
        }
        const reminders = await scripts_1.EventFetcher.getUpcomingEvents("reminder", 0);
        return { result: reminders, todayReminders: reminders };
    },
    result_keys: ["todayReminders"],
    constant: true,
    fn: async () => (await TodayRemindersPlaceholder.apply("{{todayReminders}}")).result,
    example: "Tell me about my reminders today based on the following list: {{todayReminders}}.",
    description: "Replaced with a list of the name and due date/time of all reminders that are scheduled over the next 24 hours.",
    hintRepresentation: "{{todayReminders}}",
    fullRepresentation: "Today's Reminders",
    type: types_1.PlaceholderType.Informational,
    categories: [types_1.PlaceholderCategory.Calendar],
};
exports.default = TodayRemindersPlaceholder;
