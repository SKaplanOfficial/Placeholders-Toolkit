import { Placeholder, PlaceholderCategory, PlaceholderType } from "../types";
import { getInstalledApplications } from "../scripts";

/**
 * Placeholder for the comma-separated list of application names installed on the system.
 * 
 * Syntax: `{{installedApps}}` or `{{apps}}` or `{{installedApplications}}` or `{{applications}}`
 */
const InstalledApplicationsPlaceholder: Placeholder = {
  name: "installedApps",
  regex: /{{(installedApps|apps|installedApplications|applications)}}/g,
  apply: async (str: string, context?: { [key: string]: unknown }) => {
    if (context && "installedApps" in context) {
      return {
        result: context["installedApps"] as string,
        installedApps: context["installedApps"] as string,
      };
    }

    const apps = await getInstalledApplications();
    return { result: apps, installedApps: apps };
  },
  result_keys: ["installedApps"],
  constant: true,
  fn: async () =>
    (await InstalledApplicationsPlaceholder.apply("{{installedApps}}")).result,
  example:
    "Based on this list of apps, recommend some new ones I might like: {{installedApps}}",
  description:
    "Replaced with the comma-separated list of names of applications installed on the system.",
  hintRepresentation: "{{installedApps}}",
  fullRepresentation: "List of Installed Applications",
  type: PlaceholderType.Informational,
  categories: [PlaceholderCategory.Applications],
};

export default InstalledApplicationsPlaceholder;
