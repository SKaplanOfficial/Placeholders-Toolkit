import * as fs from "fs";
import {
  CustomPlaceholder,
  JSONObject,
  Placeholder,
  PlaceholderType,
} from "./types";

/**
 * Validates a placeholder JSON object.
 * @param jsonObject The JSON object to validate.
 * @returns A tuple containing a boolean indicating whether the JSON object is valid, and a string containing an error message if the JSON object is invalid.
 */
const validatePlaceholderJSON = (jsonObject: JSONObject): [boolean, string] => {
  if (typeof jsonObject !== "object")
    return [false, "Placeholder is not an object."];
  if (!jsonObject.hasOwnProperty("name"))
    return [false, "Placeholder is missing name field."];
  if (!jsonObject.hasOwnProperty("value"))
    return [false, "Placeholder is missing value field."];

  if (typeof jsonObject.name !== "string")
    return [false, "Placeholder name is not a string."];
  if (typeof jsonObject.value !== "string")
    return [false, "Placeholder value is not a string."];

  if (
    jsonObject.hasOwnProperty("regex") &&
    typeof jsonObject.regex !== "string"
  )
    return [false, "Placeholder regex is not a string."];
  if (
    jsonObject.hasOwnProperty("description") &&
    typeof jsonObject.description !== "string"
  )
    return [false, "Placeholder description is not a string."];
  if (
    jsonObject.hasOwnProperty("example") &&
    typeof jsonObject.example !== "string"
  )
    return [false, "Placeholder example is not a string."];
  if (
    jsonObject.hasOwnProperty("hintRepresentation") &&
    typeof jsonObject.hintRepresentation !== "string"
  )
    return [false, "Placeholder hintRepresentation is not a string."];
  if (
    jsonObject.hasOwnProperty("fullRepresentation") &&
    typeof jsonObject.fullRepresentation !== "string"
  )
    return [false, "Placeholder fullRepresentation is not a string."];
  if (jsonObject.hasOwnProperty("type") && typeof jsonObject.type !== "number")
    return [false, "Placeholder type is not a number."];
  if (
    jsonObject.hasOwnProperty("categories") &&
    !Array.isArray(jsonObject.categories)
  )
    return [false, "Placeholder categories is not an array."];
  if (
    jsonObject.hasOwnProperty("categories") &&
    (jsonObject.categories as unknown[]).some(
      (category) => typeof category !== "number"
    )
  )
    return [false, "Placeholder categories contains a non-number."];
  return [true, ""];
};

/**
 * Loads a *single* placeholder from a JSON string.
 * @param jsonString The JSON string to load a placeholder from.
 * @returns A placeholder object.
 *
 * @see {@link loadPlaceholdersFromJSONString}
 */
export const loadPlaceholderFromJSONString = (
  jsonString: string
): Placeholder | undefined => {
  try {
    const newPlaceholderData = JSON.parse(jsonString);

    const validity = validatePlaceholderJSON(newPlaceholderData);
    if (!validity[0])
      throw `Error loading placeholder from JSON string. ${validity[1]}`;

    const newPlaceholder: Placeholder = {
      name: newPlaceholderData.name,
      regex: new RegExp(
        newPlaceholderData.regex || `{{${newPlaceholderData.name}}}`
      ),
      apply: async (str: string, context?: { [key: string]: unknown }) => {
        const match = str.match(new RegExp(`${newPlaceholderData.regex}`));
        let value = newPlaceholderData.value;
        (match || []).forEach((m, index) => {
          value = value.replaceAll(
            `$${index}`,
            m?.replaceAll("\\", "\\\\") || ""
          );
        });
        const res: { [key: string]: string; result: string } = {
          result: value,
        };
        res[newPlaceholderData.name] = value;
        return res;
      },
      result_keys: [newPlaceholderData.name],
      constant: true,
      fn: async (content: string) =>
        (await newPlaceholder.apply(`{{${newPlaceholderData.name}}}`)).result,
      description: newPlaceholderData.description || "",
      example: newPlaceholderData.example || "",
      hintRepresentation:
        newPlaceholderData.hintRepresentation ||
        `{{${newPlaceholderData.name}}}`,
      fullRepresentation: `${newPlaceholderData.name} (Custom)`,
      type: newPlaceholderData.type || PlaceholderType.Informational,
      categories: newPlaceholderData.categories || [],
    };
    return newPlaceholder;
  } catch (e) {
    if (e instanceof SyntaxError)
      throw `Error loading placeholder from JSON string. Invalid JSON string: ${jsonString}`;
    throw e;
  }
};

/**
 * Loads *multiple* placeholders from a JSON string.
 * @param jsonString The JSON string to load placeholders from.
 * @returns An array of placeholder objects.
 *
 * @example
 * ```ts
 * const customPlaceholders = loadPlaceholdersFromJSONString(`{
 *    "{{test}}": {
 *    "name": "test",
 *    "regex": "test",
 *    "value": "my value"
 *   }
 * }`);
 * const result = await PLApplicator.applyToString("{{test}}", undefined, customPlaceholders);
 * console.log(result); // my value
 * ```
 *
 * @see {@link loadPlaceholderFromJSONString}
 */
export const loadPlaceholdersFromJSONString = (
  jsonString: string
): Placeholder[] => {
  try {
    const newPlaceholdersData = JSON.parse(jsonString);
    const newPlaceholders = (
      Object.entries(newPlaceholdersData) as [string, CustomPlaceholder][]
    ).map(([key, placeholder]) => {
      const validity = validatePlaceholderJSON(placeholder as JSONObject);
      if (!validity[0])
        throw `Error loading placeholder from JSON string. ${validity[1]}`;

      const newPlaceholder: Placeholder = {
        name: placeholder.name,
        regex: new RegExp(`${key}`),
        apply: async (str: string, context?: { [key: string]: unknown }) => {
          const match = str.match(new RegExp(`${key}`));
          let value = placeholder.value;
          (match || []).forEach((m, index) => {
            value = value.replaceAll(
              `$${index}`,
              m?.replaceAll("\\", "\\\\") || ""
            );
          });
          const res: { [key: string]: string; result: string } = {
            result: value,
          };
          res[placeholder.name] = value;
          return res;
        },
        result_keys: [placeholder.name],
        constant: true,
        fn: async (content: string) =>
          (await newPlaceholder.apply(`{{${key}}}`)).result,
        description: placeholder.description,
        example: placeholder.example,
        hintRepresentation: placeholder.hintRepresentation,
        fullRepresentation: `${placeholder.name} (Custom)`,
        type: placeholder.type || PlaceholderType.Informational,
        categories: placeholder.categories || [],
      };
      return newPlaceholder;
    });
    return newPlaceholders;
  } catch (e) {
    if (e instanceof SyntaxError)
      throw `Error loading placeholders from JSON string. Invalid JSON string: ${jsonString}`;
    throw e;
  }
};

/**
 * Loads placeholders from a JSON file.
 * @returns An array of placeholder objects.
 */
export const loadPlaceholdersFromFile = async (
  filepath: string
): Promise<Placeholder[]> => {
  try {
    const fileContents = await fs.promises.readFile(filepath, "utf-8");
    return loadPlaceholdersFromJSONString(fileContents);
  } catch (e) {
    if (e instanceof SyntaxError)
      throw `Error loading placeholders from file. Invalid JSON file: ${filepath}`;
    throw e;
  }
};
