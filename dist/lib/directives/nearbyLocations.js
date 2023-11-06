"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
const scripts_1 = require("../scripts");
/**
 * Placeholder for a comma-separated list of nearby locations based on the given search query.
 */
const NearbyLocationsPlaceholder = {
    name: "nearbyLocations",
    regex: /{{nearbyLocations:([\s\S]*)}}/g,
    apply: async (str) => {
        const query = str.match(/(?<=(nearbyLocations:))[\s\S]*?(?=}})/)?.[0];
        const nearbyLocations = await (0, scripts_1.searchNearbyLocations)(query || "");
        return { result: nearbyLocations };
    },
    constant: false,
    fn: async (query) => (await NearbyLocationsPlaceholder.apply(`{{nearbyLocations:${query || ""}}}`)).result,
    example: "{{nearbyLocations:food}}",
    description: "Placeholder for a comma-separated list of nearby locations based on the given search query.",
    hintRepresentation: "{{nearbyLocations:...}}",
    fullRepresentation: "Nearby Locations Search",
    type: types_1.PlaceholderType.StaticDirective,
    categories: [types_1.PlaceholderCategory.Location],
};
exports.default = NearbyLocationsPlaceholder;
