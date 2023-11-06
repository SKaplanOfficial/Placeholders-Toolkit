import { EventFetcher } from "../../scripts";
import { Placeholder, PlaceholderCategory, PlaceholderType } from "../../types";

/**
 * Placeholder for a comma-separated list of the name, start time, and end time of all calendar events that are scheduled over the next 365 days.
 */
const YearEventsPlaceholder: Placeholder = {
  name: "yearEvents",
  regex: /{{yearEvents}}/g,
  apply: async (str: string, context?: { [key: string]: unknown }) => {
    if (context && "yearEvents" in context) {
      return {
        result: context["yearEvents"] as string,
        yearEvents: context["yearEvents"],
      };
    }

    const events = await EventFetcher.getUpcomingEvents("calendar", 3);
    return { result: events, yearEvents: events };
  },
  result_keys: ["yearEvents"],
  constant: true,
  fn: async () => (await YearEventsPlaceholder.apply("{{yearEvents}}")).result,
  example:
    "Tell me about my events this year based on the following list: {{yearEvents}}.",
  description:
    "Replaced with a list of the name, start time, and end time of all calendar events scheduled over the next 365 days.",
  hintRepresentation: "{{yearEvents}}",
  fullRepresentation: "This Year's Calendar Events",
  type: PlaceholderType.Informational,
  categories: [PlaceholderCategory.Calendar],
};

export default YearEventsPlaceholder;
