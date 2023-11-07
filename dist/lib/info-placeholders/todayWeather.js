"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
const utils_1 = require("../utils");
/**
 * Placeholder for 24-hour weather forecast data at the user's current location, in JSON format.
 */
const TodayWeatherPlaceholder = {
    name: "todayWeather",
    regex: /{{todayWeather}}/g,
    apply: async (str, context) => {
        if (context && "todayWeather" in context) {
            return {
                result: context["todayWeather"],
                todayWeather: context["todayWeather"],
            };
        }
        const weather = JSON.stringify(await (0, utils_1.getWeatherData)(1));
        return { result: weather, todayWeather: weather };
    },
    result_keys: ["todayWeather"],
    constant: true,
    fn: async () => (await TodayWeatherPlaceholder.apply("{{todayWeather}}")).result,
    example: "Summarize the following forecast for {{location}} today: {{todayWeather}}",
    description: "Replaced with 24-hour weather forecast data at the user's current location, in JSON format.",
    hintRepresentation: "{{todayWeather}}",
    fullRepresentation: "Today's Weather",
    type: types_1.PlaceholderType.Informational,
    categories: [types_1.PlaceholderCategory.Weather],
};
exports.default = TodayWeatherPlaceholder;
