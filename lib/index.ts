export { DefaultPlaceholders } from "./defaultPlaceholders";

/**
 * All of the default placeholder variables.
 */
export * as Placeholders from "./placeholders";

/**
 * Functions for applying placeholders to strings.
 */
export * as PLApplicator from "./apply";

/**
 * Functions for loading placeholders from files or strings.
 */
export * as PLLoader from "./load";

/**
 * Functions for creating new placeholders.
 */
export * as PLCreator from "./new";

/**
 * Rules for determining whether or not a placeholder is relevant in a given context.
 *
 * Rules are functions that take in a string and a context object and return a boolean. If the boolean is true, the placeholder is relevant and should be applied, otherwise it is not relevant. Rule checking is ignored by default for all {@link PLApplicator} functions. To enable rule checking, pass true for the `checkRules` argument.
 *
 * @example
 * ```ts
 * const newPlaceholder = PLCreator.newPlaceholder("myPlaceholder", {
 *     rules: [PLRule.RequireActiveBrowser()],
 *     apply_fn: async (str, context) => {
 *     return { result: "myValue", myPlaceholder: "myValue" };
 *   },
 * })
 * const stringToReplace = "Hello, I am {{myPlaceholder}}.";
 * const result = await PLApplicator.applyToString(stringToReplace, { customPlaceholders: [newPlaceholder], checkRules: true })
 * console.log(result) // "Hello, I am myValue." only if a browser is the frontmost application, otherwise "Hello, I am {{myPlaceholder}}."
 * ```
 */
export * as PLRule from "./rules";

/**
 * Functions for matching placeholders, parameters, and internal values.
 */
export * as PLMatcher from "./match";

export {
  Placeholder,
  CustomPlaceholder,
  PlaceholderCategory,
  PlaceholderType,
} from "./types";

/**
 * Utility functions supplying common placeholder functionality.
 */
export * as utils from "./utils";
