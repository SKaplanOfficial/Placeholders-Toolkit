import { EventFetcher } from "../../scripts";
import { Placeholder, PlaceholderCategory, PlaceholderType } from "../../types";

/**
 * Placeholder for a comma-separated list of the name, start time, and end time of all calendar events that are scheduled over the next 30 days.
 * 
 * Syntax: `{{monthEvents}}`
 */
const MonthEventsPlaceholder: Placeholder = {
  name: "monthEvents",
  regex: /{{monthEvents}}/g,
  apply: async (str: string, context?: { [key: string]: unknown }) => {
    if (context && "monthEvents" in context) {
      return {
        result: context["monthEvents"] as string,
        monthEvents: context["monthEvents"],
      };
    }

    const events = await EventFetcher.getUpcomingEvents("calendar", 2);
    return { result: events, monthEvents: events };
  },
  result_keys: ["monthEvents"],
  constant: true,
  fn: async () =>
    (await MonthEventsPlaceholder.apply("{{monthEvents}}")).result,
  example:
    "Tell me about my events this month based on the following list: {{monthEvents}}.",
  description:
    "Replaced with a list of the name, start time, and end time of all calendar events scheduled over the next 30 days.",
  hintRepresentation: "{{monthEvents}}",
  fullRepresentation: "This Month's Calendar Events",
  type: PlaceholderType.Informational,
  categories: [PlaceholderCategory.Calendar],
};

export default MonthEventsPlaceholder;
