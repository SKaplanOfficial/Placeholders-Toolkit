"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
/**
 * Placeholder for the long name of the current timezone. Barring any issues, this should always be replaced.
 */
const TimezonePlaceholder = {
    name: "timezone",
    regex: /{{timezone}}/g,
    apply: async (str, context) => {
        const time = context && "timezone" in context
            ? context["timezone"]
            : Intl.DateTimeFormat(undefined, { timeZoneName: "long" })
                .formatToParts(new Date())
                .filter((s) => s.type == "timeZoneName")?.[0]?.value ||
                Intl.DateTimeFormat().resolvedOptions().timeZone;
        return { result: time, time: time };
    },
    result_keys: ["timezone"],
    constant: true,
    fn: async () => (await TimezonePlaceholder.apply(`{{timezone}}`)).result,
    example: "Convert {{time}} PST to {{timezone}}.",
    description: "Replaced with name of the current timezone.",
    hintRepresentation: "{{timezone}}",
    fullRepresentation: "Current Time Zone",
    type: types_1.PlaceholderType.Informational,
    categories: [types_1.PlaceholderCategory.Location],
};
exports.default = TimezonePlaceholder;
