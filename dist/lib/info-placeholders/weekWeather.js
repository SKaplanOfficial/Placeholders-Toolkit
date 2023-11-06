"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
const utils_1 = require("../utils");
/**
 * Placeholder for 7-day weather forecast data at the user's current location, in JSON format.
 */
const WeekWeatherPlaceholder = {
    name: "weekWeather",
    regex: /{{weekWeather}}/g,
    apply: async (str, context) => {
        if (context && "weekWeather" in context) {
            return { result: context["weekWeather"], weekWeather: context["weekWeather"] };
        }
        const weather = JSON.stringify(await (0, utils_1.getWeatherData)(7));
        return { result: weather, weekWeather: weather };
    },
    result_keys: ["weekWeather"],
    constant: true,
    fn: async () => (await WeekWeatherPlaceholder.apply("{{weekWeather}}")).result,
    example: "Summarize the following forecast for {{location}} this week: {{weekWeather}}",
    description: "Replaced with 7-day weather forecast data at the user's current location, in JSON format.",
    hintRepresentation: "{{weekWeather}}",
    fullRepresentation: "This Week's Weather",
    type: types_1.PlaceholderType.Informational,
    categories: [types_1.PlaceholderCategory.Weather],
};
exports.default = WeekWeatherPlaceholder;
