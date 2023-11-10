import { Placeholder, PlaceholderCategory, PlaceholderType } from "../types";
import { searchNearbyLocations } from "../scripts";

/**
 * Placeholder for a comma-separated list of nearby locations based on the given search query.
 * 
 * Syntax: `{{nearbyLocations:<query>}}`, where `<query>` is the search query.
 */
const NearbyLocationsPlaceholder: Placeholder = {
  name: "nearbyLocations",
  regex: /{{nearbyLocations:([\s\S]*)}}/g,
  apply: async (str: string) => {
    const query = str.match(/(?<=(nearbyLocations:))[\s\S]*?(?=}})/)?.[0];
    const nearbyLocations = await searchNearbyLocations(query || "");
    return { result: nearbyLocations };
  },
  constant: false,
  fn: async (query?: string) =>
    (
      await NearbyLocationsPlaceholder.apply(
        `{{nearbyLocations:${query || ""}}}`
      )
    ).result,
  example: "{{nearbyLocations:food}}",
  description:
    "Placeholder for a comma-separated list of nearby locations based on the given search query.",
  hintRepresentation: "{{nearbyLocations:...}}",
  fullRepresentation: "Nearby Locations Search",
  type: PlaceholderType.StaticDirective,
  categories: [PlaceholderCategory.Location],
};

export default NearbyLocationsPlaceholder;
