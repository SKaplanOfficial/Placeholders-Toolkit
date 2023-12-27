import { PlaceholderType, PlaceholderCategory, Placeholder } from "./types";

/**
 * A dummy placeholder.
 * @returns A placeholder object.
 */
export const dummyPlaceholder = (): Placeholder => {
  return {
    name: "New Placeholder",
    regex: /{{newPlaceholder}}/g,
    rules: [],
    apply: async () => ({
      result: "",
    }),
    constant: true,
    fn: async () =>
      (await dummyPlaceholder().apply("{{newPlaceholder}}")).result,
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
  options?: {
    /**
     * The regex to match the placeholder.
     */
    regex?: RegExp;

    /**
     * The string to replace the placeholder with. Specify either this or apply_fn. Can include other placeholders.
     */
    replace_with?: string;

    /**
     * The rules that determine whether or not the placeholder is relevant in the current context.
     * @param str The string to check the rules against.
     * @param context The context object to store & retrieve values from.
     * @returns True if the placeholder should be replaced, false otherwise.
     */
    rules?: ((
      str: string,
      context?: { [key: string]: unknown }
    ) => Promise<boolean>)[];

    /**
     * The function to apply to the placeholder. Specify either this or replace_with.
     * @param str The string to apply the placeholder to.
     * @param context The context object to store & retrieve values from.
     * @returns An object containing the result of the placeholder and any other values to store in the context object.
     */
    apply_fn?: (
      str: string,
      context?: { [key: string]: unknown }
    ) => Promise<{ result: string; [key: string]: unknown }>;

    /**
     * Whether the placeholder's value is constant over the course of a single run.
     */
    constant?: boolean;

    /**
     * A brief description of the placeholder.
     */
    description?: string;

    /**
     * An example of the placeholder in use.
     */
    example?: string;

    /**
     * A representation of the placeholder to show in hints.
     */
    hintRepresentation?: string;

    /**
     * A representation of the placeholder to show in detailed explanations.
     */
    fullRepresentation?: string;

    /**
     * The type of the placeholder.
     */
    type?: PlaceholderType;

    /**
     * The categories of the placeholder.
     */
    categories?: PlaceholderCategory[];
  }
) => {
  if (options?.apply_fn != undefined && options?.replace_with != undefined)
    throw new Error("Cannot specify both apply_fn and replace_with");

  if (options?.replace_with != undefined) {
    if (options.constant) {
      options.apply_fn = async () => ({
        result: options.replace_with || "",
        [name]: options.replace_with || "",
      });
    } else {
      options.apply_fn = async () => ({
        result: options.replace_with || "",
        [name]: options.replace_with || "",
      });
    }
  }

  const newPlaceholder: Placeholder = {
    name: name,
    regex: options?.regex || new RegExp(`{{${name}}}`, "g"),
    rules: options?.rules || [],
    apply:
      options?.apply_fn ||
      (async () => ({
        result: "",
      })),
    result_keys: [name],
    constant: options?.constant || false,
    fn: async () => (await newPlaceholder.apply(`{{${name}}}`)).result,
    description: options?.description || "",
    example: options?.example || "",
    hintRepresentation: options?.hintRepresentation || `{{${name}}}`,
    fullRepresentation: options?.fullRepresentation || `${name} (Custom)`,
    type: options?.type || PlaceholderType.Informational,
    categories: options?.categories || [],
  };

  return newPlaceholder;
};

/**
 * Builds a list of placeholders from a list of placeholder names and values.
 * @param valueDict A dictionary of placeholder names and values.
 * @returns A list of placeholders.
 */
export const buildPlaceholdersFromValueDict = (valueDict: {
  [key: string]: string;
}) => {
  const placeholders: Placeholder[] = [];
  for (const key in valueDict) {
    if (Object.prototype.hasOwnProperty.call(valueDict, key)) {
      const value = valueDict[key];
      placeholders.push(
        newPlaceholder(key, { replace_with: value, constant: true })
      );
    }
  }
  return placeholders;
};

/**
 * Builds a list of placeholders from a list of placeholder names and application functions.
 * @param fnDict A dictionary of placeholder names and application functions.
 * @returns A list of placeholders.
 */
export const buildPlaceholdersFromFnDict = (fnDict: {
  [key: string]: (
    str: string,
    context?: { [key: string]: unknown }
  ) => Promise<{ result: string; [key: string]: unknown }>;
}) => {
  const placeholders: Placeholder[] = [];
  for (const key in fnDict) {
    if (Object.prototype.hasOwnProperty.call(fnDict, key)) {
      const fn = fnDict[key];
      placeholders.push(newPlaceholder(key, { apply_fn: fn }));
    }
  }
  return placeholders;
};
