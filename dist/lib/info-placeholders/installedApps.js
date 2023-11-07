"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
const scripts_1 = require("../scripts");
/**
 * Placeholder for the comma-separated list of application names installed on the system.
 */
const InstalledApplicationsPlaceholder = {
    name: "installedApps",
    regex: /{{(installedApps|apps|installedApplications|applications)}}/g,
    apply: async (str, context) => {
        if (context && "installedApps" in context) {
            return {
                result: context["installedApps"],
                installedApps: context["installedApps"],
            };
        }
        const apps = await (0, scripts_1.getInstalledApplications)();
        return { result: apps, installedApps: apps };
    },
    result_keys: ["installedApps"],
    constant: true,
    fn: async () => (await InstalledApplicationsPlaceholder.apply("{{installedApps}}")).result,
    example: "Based on this list of apps, recommend some new ones I might like: {{installedApps}}",
    description: "Replaced with the comma-separated list of names of applications installed on the system.",
    hintRepresentation: "{{installedApps}}",
    fullRepresentation: "List of Installed Applications",
    type: types_1.PlaceholderType.Informational,
    categories: [types_1.PlaceholderCategory.Applications],
};
exports.default = InstalledApplicationsPlaceholder;
