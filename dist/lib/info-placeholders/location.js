"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
const utils_1 = require("../utils");
/**
 * Placeholder for the user's current location in the format "city, region, country".
 * The location is determined by the user's IP address.
 */
const LocationPlaceholder = {
    name: "location",
    regex: /{{(location|currentLocation)}}/g,
    apply: async () => {
        const jsonObj = await (0, utils_1.getJSONResponse)("https://get.geojs.io/v1/ip/geo.json");
        const city = jsonObj["city"];
        const region = jsonObj["region"];
        const country = jsonObj["country"];
        const location = `${city}, ${region}, ${country}`;
        return { result: location, location: location };
    },
    result_keys: ["location"],
    constant: true,
    fn: async () => (await LocationPlaceholder.apply("{{location}}")).result,
    example: "Tell me the history of {{location}}.",
    description: 'Replaced with the user\'s current location in the format "city, region, country".',
    hintRepresentation: "{{location}}",
    fullRepresentation: "Current Location",
    type: types_1.PlaceholderType.Informational,
    categories: [types_1.PlaceholderCategory.Location],
};
exports.default = LocationPlaceholder;
