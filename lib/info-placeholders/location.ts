import { Placeholder, PlaceholderCategory, PlaceholderType } from "../types";
import { getJSONResponse } from "../utils";

/**
 * Placeholder for the user's current location in the format "city, region, country".
 * The location is determined by the user's IP address.
 */
const LocationPlaceholder: Placeholder = {
  name: "location",
  regex: /{{(location|currentLocation)}}/g,
  apply: async () => {
    const jsonObj = await getJSONResponse(
      "https://get.geojs.io/v1/ip/geo.json"
    );
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
  description:
    'Replaced with the user\'s current location in the format "city, region, country".',
  hintRepresentation: "{{location}}",
  fullRepresentation: "Current Location",
  type: PlaceholderType.Informational,
  categories: [PlaceholderCategory.Location],
};

export default LocationPlaceholder;
