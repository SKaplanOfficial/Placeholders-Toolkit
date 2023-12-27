import { Placeholder, PlaceholderCategory, PlaceholderType } from "../types";
import { getActiveBrowser } from "../utils";
import { RequireActiveBrowser } from "../rules";

/**
 * Placeholder for the current URL in any supported browser. If the current application is not a supported browser, this placeholder will not be replaced.
 * 
 * Syntax: `{{currentURL}}` or `{{currentTabURL}}`
 */
const CurrentURLPlaceholder: Placeholder = {
  name: "currentURL",
  regex: /{{(currentURL|currentTabURL)}}/g,
  rules: [RequireActiveBrowser()],
  apply: async (str: string, context?: { [key: string]: unknown }) => {
    try {
      if (
        context &&
        "currentURL" in context &&
        (context["currentURL"] as string).length > 0
      ) {
        return {
          result: context["currentURL"] as string,
          currentURL: context["currentURL"] as string,
          currentAppName: context["currentAppName"] as string,
        };
      }

      const app = await getActiveBrowser();
      if (!app) return { result: "", currentURL: "", currentAppName: "" };

      const url = await app.currentURL();
      return { result: url, currentURL: url, currentAppName: app.name };
    } catch (e) {
      return { result: "", currentURL: "", currentAppName: "" };
    }
  },
  result_keys: ["currentURL", "currentAppName"],
  dependencies: ["currentAppName"],
  constant: true,
  fn: async () => (await CurrentURLPlaceholder.apply("{{currentURL}}")).result,
  example: "Tell me about {{currentURL}}",
  description:
    "Replaced with the URL of the current tab in any supported browser.",
  hintRepresentation: "{{currentURL}}",
  fullRepresentation: "URL of Current Browser Tab",
  type: PlaceholderType.Informational,
  categories: [PlaceholderCategory.Internet, PlaceholderCategory.Applications],
};

export default CurrentURLPlaceholder;
