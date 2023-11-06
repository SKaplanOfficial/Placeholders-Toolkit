import { PlaceholderType, PlaceholderCategory, Placeholder } from "./types";

/**
 * A dummy placeholder.
 * @returns A placeholder object.
 */

export const dummyPlaceholder = (): Placeholder => {
  return {
    name: "New Placeholder",
    regex: /{{newPlaceholder}}/g,
    apply: async (str: string, context?: { [key: string]: unknown; }) => ({ result: "" }),
    constant: true,
    fn: async (content: string) => (await dummyPlaceholder().apply("{{newPlaceholder}}")).result,
    description: "A dummy placeholder.",
    example: "This is an example of a dummy placeholder: {{newPlaceholder}}",
    hintRepresentation: "{{newPlaceholder}}",
    fullRepresentation: "Dummy Placeholder",
    type: PlaceholderType.Informational,
    categories: [],
  };
};

/**
 * Creates a new placeholder.
 * @param name The name of the placeholder.
 * @param regex The regex to match the placeholder.
 * @param apply_fn The function to apply to the placeholder. Specify either this or replace_with.
 * @param replace_with The string to replace the placeholder with. Specify either this or apply_fn.
 * @param constant Whether the placeholder is constant.
 * @param description A brief description of the placeholder.
 * @param example An example of the placeholder.
 * @param hintRepresentation A representation of the placeholder to show in hints.
 * @param fullRepresentation A representation of the placeholder to show in detailed explanations.
 * @param type The type of the placeholder.
 * @param categories The categories of the placeholder.
 * @returns A placeholder object.
 */

export const newPlaceholder = (
  name: string,
  regex?: RegExp,
  apply_fn?: (str: string, context?: { [key: string]: unknown; }) => Promise<{ result: string;[key: string]: unknown; }>,
  replace_with?: string,
  constant = false,
  description?: string,
  example?: string,
  hintRepresentation?: string,
  fullRepresentation?: string,
  type = PlaceholderType.Informational,
  categories?: PlaceholderCategory[]
) => {
  if (apply_fn != undefined && replace_with != undefined)
    throw new Error("Cannot specify both apply_fn and replace_with");

  if (replace_with != undefined) {
    if (constant) {
      apply_fn = async (str: string, context?: { [key: string]: unknown; }) => ({
        result: replace_with,
        [name]: replace_with,
      });
    } else {
      apply_fn = async (str: string, context?: { [key: string]: unknown; }) => ({ result: replace_with });
    }
  }

  const newPlaceholder: Placeholder = {
    name: name,
    regex: regex || new RegExp(`{{${name}}}`, "g"),
    apply: apply_fn || (async (str: string, context?: { [key: string]: unknown; }) => ({ result: "" })),
    result_keys: [name],
    constant: constant,
    fn: async (content: string) => (await newPlaceholder.apply(`{{${name}}}`)).result,
    description: description || "",
    example: example || "",
    hintRepresentation: hintRepresentation || `{{${name}}}`,
    fullRepresentation: fullRepresentation || `${name} (Custom)`,
    type: type,
    categories: categories || [],
  };

  return newPlaceholder;
};