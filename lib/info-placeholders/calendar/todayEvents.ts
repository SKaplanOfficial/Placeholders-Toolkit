import { EventFetcher } from "../../scripts";
import { Placeholder, PlaceholderCategory, PlaceholderType } from "../../types";

/**
 * Placeholder for a comma-separated list of the name, start time, and end time of all calendar events that are scheduled over the next 24 hours.
 * 
 * Syntax: `{{todayEvents}}`
 */
const TodayEventsPlaceholder: Placeholder = {
  name: "todayEvents",
  regex: /{{todayEvents}}/g,
  apply: async (str: string, context?: { [key: string]: unknown }) => {
    if (context && "todayEvents" in context) {
      return {
        result: context["todayEvents"] as string,
        todayEvents: context["todayEvents"],
      };
    }

    const events = await EventFetcher.getUpcomingEvents("calendar", 0);
    return { result: events, todayEvents: events };
  },
  result_keys: ["todayEvents"],
  constant: true,
  fn: async () =>
    (await TodayEventsPlaceholder.apply("{{todayEvents}}")).result,
  example:
    "Tell me about my events today based on the following list: {{todayEvents}}.",
  description:
    "Replaced with a list of the name, start time, and end time of all calendar events scheduled over the 24 hours.",
  hintRepresentation: "{{todayEvents}}",
  fullRepresentation: "Today's Calendar Events",
  type: PlaceholderType.Informational,
  categories: [PlaceholderCategory.Calendar],
};

export default TodayEventsPlaceholder;
