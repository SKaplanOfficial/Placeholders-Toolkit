export type Placeholder = {
  /**
   * The detailed name of the placeholder.
   */
  name: string;

  /**
   * The regex pattern that matches the placeholder, including any aliases.
   */
  regex: RegExp;

  /**
   * The function that applies the placeholder to a string.
   * @param str The string to apply the placeholder to.
   * @returns The string with the placeholder applied.
   */
  apply: (
    str: string,
    context?: { [key: string]: unknown }
  ) => Promise<{ result: string; [key: string]: unknown }>;

  /**
   * The keys of the result object relevant to the placeholder. When placeholders are applied in bulk, this list is used to determine which keys to return as well as to make optimizations when determining which placeholders to apply. The first key in the list is the key for the placeholder's value.
   */
  result_keys?: string[];

  /**
   * The dependencies of the placeholder. When placeholders are applied in bulk, this list is used to determine the order in which placeholders are applied.
   */
  dependencies?: string[];

  /**
   * Whether or not the placeholder has a constant value during the placeholder substitution process. For example, users can use multiple URL placeholders, therefore it is not constant, while {{clipboardText}} is constant for the duration of the substitution process.
   */
  constant: boolean;

  /**
   * The function that applies the placeholder to a string. This function is used when the placeholder is used a {{js:...}} placeholder.
   * @param args
   * @returns
   */
  fn: (...args: (never | string)[]) => Promise<string>;

  /**
   * The example usage of the placeholder, shown when the placeholder is detected in a prompt.
   */
  example: string;

  /**
   * The description of the placeholder, shown when the placeholder is detected in a prompt.
   */
  description: string;

  /**
   * The demonstration representation of the placeholder, shown as the "name" of the placeholder when the placeholder is detected in a prompt.
   */
  hintRepresentation: string;

  /**
   * The full name representation of the placeholder, properly spaced.
   */
  fullRepresentation: string;

  /**
   * The type of the placeholder, used to inform design decisions.
   */
  type: PlaceholderType;

  /**
   * The category of the placeholder, used to inform design decisions.
   */
  categories: PlaceholderCategory[];
};

/**
 * A custom placeholder stored in custom_placeholders.json.
 */
export type CustomPlaceholder = {
  /**
   * The name of the placeholder, used as a REGEX pattern to detect the placeholder.
   */
  name: string;

  /**
   * A description of the placeholder shown when the placeholder is detected in a prompt.
   */
  description: string;

  /**
   * The text to replace the placeholder with. Can include other placeholders, which will be replaced before the custom placeholder is applied.
   */
  value: string;

  /**
   * An example usage of the placeholder, shown when the placeholder is detected in a prompt.
   */
  example: string;

  /**
   * A friendlier name for the placeholder, shown as the "name" of the placeholder when the placeholder is detected in a prompt.
   */
  hintRepresentation: string;

  /**
   * The type of the placeholder, used to inform design decisions.
   */
  type: number;

  /**
   * The category of the placeholder, used to inform design decisions.
   */
  categories: number[];
};

/**
 * High-level placeholder types.
 */
export enum PlaceholderType {
  /**
   * A placeholder that quickly evaluates to a consistently formatted value.
   */
  Informational,

  /**
   * A placeholder that completes a brief action, then evaluates to a short or empty value.
   */
  StaticDirective,

  /**
   * A placeholder that requires user input or a long-running action to evaluate.
   */
  InteractiveDirective,

  /**
   * A placeholder that executes a script and evaluates to an arbitrary value.
   */
  Script,

  /**
   * A user-defined placeholder.
   */
  Custom,
}

/**
 * Mid-level categories of placeholders.
 */
export enum PlaceholderCategory {
  Memory,
  Calendar,
  Weather,
  Location,
  Device,
  Alert,
  Internet,
  Files,
  Meta,
  Logic,
  Applications,
  API,
  Other,
  Custom,
}

/**
 * A JSON object.
 */
export type JSONObject = {
  [key: string]:
    | string
    | number
    | JSONObject
    | JSONObject[]
    | string[]
    | number[];
};

/**
 * A Raycast extension.
 */
export type Extension = {
  /**
   * The title of the extension as it appears in Raycast.
   */
  title: string;

  /**
   * The name of the extension as defined in the extension's package.json.
   */
  name: string;

  /**
   * The path to the extension's directory.
   */
  path: string;

  /**
   * The author of the extension as defined in the extension's package.json.
   */
  author: string;

  /**
   * The description of the extension as defined in the extension's package.json.
   */
  description: string;

  /**
   * The list of commands belonging to the extension.
   */
  commands: ExtensionCommand[];
};

/**
 * A Raycast extension command.
 */
export type ExtensionCommand = {
  /**
   * The title of the command as it appears in Raycast.
   */
  title: string;

  /**
   * The name of the command as defined in the extension's package.json.
   */
  name: string;

  /**
   * The description of the command as defined in the extension's package.json.
   */
  description: string;

  /**
   * The link to run the command.
   */
  deeplink: string;
};
