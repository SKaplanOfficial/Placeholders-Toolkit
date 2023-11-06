"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@raycast/utils");
const types_1 = require("../types");
/**
   * Placeholder for the current time supporting an optional format argument. Defaults to "Hour:Minute:Second AM/PM". Barring any issues, this should always be replaced.
   */
const TimePlaceholder = {
    name: "time",
    regex: /{{(time|currentTime)( format=("|').*?("|'))?}}/g,
    apply: async (str, context) => {
        const format = str.match(/(?<=format=("|')).*?(?=("|'))/)?.[0] || "HH:mm:s a";
        const time = context && "time" in context
            ? context["time"]
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
        return { result: time, time: time };
    },
    result_keys: ["time"],
    constant: false,
    fn: async (format) => (await TimePlaceholder.apply(`{{time${format?.length ? ` format="${format}"` : ""}}}`)).result,
    example: "It's currently {{time format='HH:mm'}}. How long until dinner?",
    description: "Replaced with the current time in the specified format.",
    hintRepresentation: "{{time}}",
    fullRepresentation: "Current Time",
    type: types_1.PlaceholderType.Informational,
    categories: [types_1.PlaceholderCategory.Calendar],
};
exports.default = TimePlaceholder;
