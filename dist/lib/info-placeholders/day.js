"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
/**
 * Placeholder for the current day of the week, e.g. "Monday", using en-US as the default locale. Supports an optional locale argument. Barring any issues, this should always be replaced.
 */
const DayPlaceholder = {
    name: "day",
    regex: /{{(day|dayName|currentDay|currentDayName)( locale=("|').*?("|'))?}}/g,
    apply: async (str) => {
        const locale = str.match(/(?<=locale=("|')).*?(?=("|'))/)?.[0] || "en-US";
        const day = new Date().toLocaleDateString(locale, { weekday: "long" });
        return { result: day, day: day };
    },
    result_keys: ["day"],
    constant: false,
    fn: async (locale) => (await DayPlaceholder.apply(`{{day${locale?.length ? ` locale="${locale}"` : ""}}}`)).result,
    example: "Write a generic agenda for {{day locale='en-GB'}}",
    description: "Replaced with the name of the current day of the week in the specified locale.",
    hintRepresentation: "{{day}}",
    fullRepresentation: "Day of Week",
    type: types_1.PlaceholderType.Informational,
    categories: [types_1.PlaceholderCategory.Calendar],
};
exports.default = DayPlaceholder;
