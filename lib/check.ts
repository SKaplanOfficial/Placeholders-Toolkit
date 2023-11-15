import { DefaultPlaceholders } from "./defaultPlaceholders";
import { PLRange, Placeholder } from "./types";

/**
 * Gets a list of placeholders that are included in a string.
 * @param str The string to check.
 * @param options The options for applying placeholders.
 * @param options.customPlaceholders The list of custom (user-defined) placeholders. Provide this if you have a separate list of custom placeholders.
 * @param options.defaultPlaceholders The list of default placeholders. Provide this if you have customized the order of default placeholders or added additional defaults.
 * @param options.allPlaceholders The list of all placeholders (custom and default). Provide this if you have a single list of all placeholders.
 * @param options.strict Whether to only include placeholders that are surrounded by double curly braces and match the placeholder regex. Defaults to false (will include placeholders that are not surrounded by double curly braces).
 * @returns The list of {@link Placeholder} objects.
 */
export const checkForPlaceholders = async (
  str: string,
  options?: {
    customPlaceholders?: Placeholder[];
    defaultPlaceholders?: Placeholder[];
    allPlaceholders?: Placeholder[];
    strict?: boolean;
  }
): Promise<Placeholder[]> => {
  const sortedPlaceholders = options?.allPlaceholders
    ? options.allPlaceholders
    : [
        ...(options?.customPlaceholders || []),
        ...(options?.defaultPlaceholders
          ? options.defaultPlaceholders
          : Object.values(DefaultPlaceholders)),
      ];

  const includedPlaceholders = sortedPlaceholders
    .filter((placeholder) => {
      return (
        str.match(placeholder.regex) != undefined ||
        (!options?.strict &&
          (str.match(
            new RegExp(
              "(^| )" +
                placeholder.regex.source.replace("{{", "").replace("}}", ""),
              "g"
            )
          ) != undefined ||
            str.match(
              new RegExp(
                `(^| |:|})({?{?)${placeholder.name.replace(
                  /[!#+-]/g,
                  "\\$1"
                )}(}?}?)`,
                "g"
              )
            ) != undefined))
      );
    })
    .sort((placeholderA, placeholderB) => {
      // Order definitive occurrences first
      if (str.match(placeholderA.regex)) {
        return -1;
      } else if (str.match(placeholderB.regex)) {
        return 1;
      } else {
        return 0;
      }
    });
  return includedPlaceholders;
};

/**
 * Gets a list of the ranges of placeholders that are included in a string.
 * @param str The string to check.
 * @param options The options for applying placeholders. Optional.
 * @param options.customPlaceholders The list of custom (user-defined) placeholders. Provide this if you have a separate list of custom placeholders.
 * @param options.defaultPlaceholders The list of default placeholders. Provide this if you have customized the order of default placeholders or added additional defaults.
 * @param options.allPlaceholders The list of all placeholders (custom and default). Provide this if you have a single list of all placeholders.
 * @param options.strict Whether to only include placeholders that are surrounded by double curly braces and match the placeholder regex. Defaults to false (will include placeholders that are not surrounded by double curly braces).
 * @returns The list of placeholders and their ranges.
 */
export const getPlaceholderRanges = async (
  str: string,
  options?: {
    customPlaceholders?: Placeholder[];
    defaultPlaceholders?: Placeholder[];
    allPlaceholders?: Placeholder[];
    strict?: boolean;
  }
): Promise<
  {
    placeholder: Placeholder;
    range: PLRange;
  }[]
> => {
  const includedPlaceholders = await checkForPlaceholders(str, options);
  const ranges = includedPlaceholders.map((placeholder) => {
    const match = str.match(new RegExp(placeholder.regex.source));
    if (match?.index) {
      return {
        placeholder,
        range: {
          startIndex: match.index,
          endIndex: match.index + match[0].length,
        },
      };
    }
  });
  return ranges.filter((range) => range != undefined) as {
    placeholder: Placeholder;
    range: PLRange;
  }[];
};

/**
 * Checks if a string contains placeholders in a given range.
 * @param str The string to check.
 * @param range The range to check.
 * @param options The options for applying placeholders. Optional.
 * @param options.customPlaceholders The list of custom (user-defined) placeholders. Provide this if you have a separate list of custom placeholders.
 * @param options.defaultPlaceholders The list of default placeholders. Provide this if you have customized the order of default placeholders or added additional defaults.
 * @param options.allPlaceholders The list of all placeholders (custom and default). Provide this if you have a single list of all placeholders.
 * @param options.strict Whether to only include placeholders that are surrounded by double curly braces and match the placeholder regex. Defaults to false (will include placeholders that are not surrounded by double curly braces).
 * @returns The list of placeholders contained within the range.
 */
export const checkForPlaceholdersInRange = async (
  str: string,
  range: PLRange,
  options?: {
    customPlaceholders?: Placeholder[];
    defaultPlaceholders?: Placeholder[];
    allPlaceholders?: Placeholder[];
    strict?: boolean;
  }
): Promise<Placeholder[]> => {
  const substr = str.substring(range.startIndex, range.endIndex);
  const includedPlaceholders = await checkForPlaceholders(substr, options);
  const ranges = includedPlaceholders.map((placeholder) => {
    const match = str.match(new RegExp(placeholder.regex.source));
    if (match?.index) {
      return placeholder
    }
  });
  return ranges.filter((range) => range != undefined) as Placeholder[];
}
