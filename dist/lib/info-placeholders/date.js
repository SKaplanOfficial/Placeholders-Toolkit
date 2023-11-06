"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@raycast/utils");
const types_1 = require("../types");
/**
 * Placeholder for the current date supporting an optional format argument. Defaults to "Month Day, Year". Barring any issues, this should always be replaced.
 */
const DatePlaceholder = {
    name: "date",
    regex: /{{(date|currentDate)( format=("|').*?("|'))?}}/g,
    apply: async (str, context) => {
        const format = str.match(/(?<=format=("|')).*?(?=("|'))/)?.[0] || "MMMM d, yyyy";
        const dateStr = context && "date" in context
            ? context["date"]
            : await (0, utils_1.runAppleScript)(`use framework "Foundation"
      set currentDate to current application's NSDate's alloc()'s init()
      try
        set formatter to current application's NSDateFormatter's alloc()'s init()
        set format to "${format}"
        formatter's setAMSymbol:"AM"
        formatter's setPMSymbol:"PM"
        formatter's setDateFormat:format
        return (formatter's stringFromDate:currentDate) as string
      end try`);
        return { result: dateStr, date: dateStr };
    },
    result_keys: ["date"],
    constant: false,
    fn: async (format) => (await DatePlaceholder.apply(`{{date${format?.length ? ` format="${format}"` : ""}}`)).result,
    example: "What happened on {{date format='MMMM d'}} in history?",
    description: "Replaced with the current date in the specified format.",
    hintRepresentation: "{{date}}",
    fullRepresentation: "Current Date",
    type: types_1.PlaceholderType.Informational,
    categories: [types_1.PlaceholderCategory.Calendar],
};
exports.default = DatePlaceholder;
