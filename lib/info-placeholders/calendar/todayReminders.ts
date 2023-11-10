import { EventFetcher } from "../../scripts";
import { Placeholder, PlaceholderCategory, PlaceholderType } from "../../types";

/**
 * Placeholder for a comma-separated list of the name and due date/time of all reminders that are scheduled over the next 24 hours.
 * 
 * Syntax: `{{todayReminders}}`
 */
const TodayRemindersPlaceholder: Placeholder = {
  name: "todayReminders",
  regex: /{{(todayReminders|todayTasks|todayTodos)}}/g,
  apply: async (str: string, context?: { [key: string]: unknown }) => {
    if (context && "todayReminders" in context) {
      return {
        result: context["todayReminders"] as string,
        todayReminders: context["todayReminders"],
      };
    }

    const reminders = await EventFetcher.getUpcomingEvents("reminder", 0);
    return { result: reminders, todayReminders: reminders };
  },
  result_keys: ["todayReminders"],
  constant: true,
  fn: async () =>
    (await TodayRemindersPlaceholder.apply("{{todayReminders}}")).result,
  example:
    "Tell me about my reminders today based on the following list: {{todayReminders}}.",
  description:
    "Replaced with a list of the name and due date/time of all reminders that are scheduled over the next 24 hours.",
  hintRepresentation: "{{todayReminders}}",
  fullRepresentation: "Today's Reminders",
  type: PlaceholderType.Informational,
  categories: [PlaceholderCategory.Calendar],
};

export default TodayRemindersPlaceholder;
