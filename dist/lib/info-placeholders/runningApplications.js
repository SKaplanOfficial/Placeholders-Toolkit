"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
const scripts_1 = require("../scripts");
/**
 * Placeholder for a comma-separated list of the names of all running applications that are visible to the user.
 */
const RunningApplicationsPlaceholder = {
    name: "runningApplications",
    regex: /{{runningApplications}}/g,
    apply: async (str, context) => {
        if (context && "runningApplications" in context) {
            return {
                result: context["runningApplications"],
                runningApplications: context["runningApplications"],
            };
        }
        const apps = await (0, scripts_1.getRunningApplications)();
        return { result: apps, runningApplications: apps };
    },
    result_keys: ["runningApplications"],
    constant: true,
    fn: async () => (await RunningApplicationsPlaceholder.apply("{{runningApplications}}")).result,
    example: "Come up for a name for a workspace running the following apps: {{runningApplications}}",
    description: "Replaced with the comma-separated list of names of all running applications that are visible to the user.",
    hintRepresentation: "{{runningApplications}}",
    fullRepresentation: "Running Applications",
    type: types_1.PlaceholderType.Informational,
    categories: [types_1.PlaceholderCategory.Applications],
};
exports.default = RunningApplicationsPlaceholder;
