import { Placeholder } from "./types";
/**
 * Applies placeholders to a single string.
 * @param str The string to apply placeholders to.
 * @param context The context to apply placeholders with.
 * @param customPlaceholders The list of custom (user-defined) placeholders. Provide this if you have a separate list of custom placeholders.
 * @param defaultPlaceholders The list of default placeholders. Provide this if you have customized the order of default placeholders or added additional defaults.
 * @param allPlaceholders The list of all placeholders (custom and default). Provide this if you have a single list of all placeholders.
 * @returns The string with placeholders applied.
 */
export declare const applyToString: (str: string, context?: {
    [key: string]: unknown;
} | undefined, customPlaceholders?: Placeholder[], defaultPlaceholders?: Placeholder[], allPlaceholders?: Placeholder[]) => Promise<string>;
/**
 * Applies placeholders to an array of strings.
 * @param strs The array of strings to apply placeholders to.
 * @param context The context to apply placeholders with.
 * @returns The array of strings with placeholders applied.
 */
export declare const applyToStrings: (strs: string[], context?: {
    [key: string]: string;
} | undefined) => Promise<string[]>;
/**
 * Applies placeholders to the value of a single key in an object.
 * @param obj The object to apply placeholders to.
 * @param key The key of the value to apply placeholders to.
 * @param context The context to apply placeholders with.
 * @returns The object with placeholders applied.
 */
export declare const applyToObjectValueWithKey: (obj: {
    [key: string]: unknown;
}, key: string, context?: {
    [key: string]: string;
} | undefined) => Promise<string | string[] | {
    [key: string]: unknown;
}>;
/**
 * Applies placeholders to an object's values, specified by keys.
 * @param obj The object to apply placeholders to.
 * @param keys The keys of the object to apply placeholders to.
 * @param context The context to apply placeholders with.
 * @returns The object with placeholders applied.
 */
export declare const applyToObjectValuesWithKeys: (obj: {
    [key: string]: unknown;
}, keys: string[], context?: {
    [key: string]: string;
} | undefined) => Promise<{
    [key: string]: unknown;
}>;
/**
 * Gets a list of placeholders that are included in a string.
 * @param str The string to check.
 * @param customPlaceholders The list of custom (user-defined) placeholders. Provide this if you have a separate list of custom placeholders.
 * @param defaultPlaceholders The list of default placeholders. Provide this if you have customized the order of default placeholders or added additional defaults.
 * @param allPlaceholders The list of all placeholders (custom and default). Provide this if you have a single list of all placeholders.
 * @returns The list of {@link Placeholder} objects.
 */
export declare const checkForPlaceholders: (str: string, customPlaceholders?: Placeholder[], defaultPlaceholders?: Placeholder[], allPlaceholders?: Placeholder[]) => Promise<Placeholder[]>;
/**
 * Applies placeholders to a string by memoizing the results of each placeholder.
 * @param str The string to apply placeholders to.
 * @param context The context to apply placeholders with.
 * @param customPlaceholders The list of custom (user-defined) placeholders. Provide this if you have a separate list of custom placeholders.
 * @param defaultPlaceholders The list of default placeholders. Provide this if you have customized the order of default placeholders or added additional defaults.
 * @param allPlaceholders The list of all placeholders (custom and default). Provide this if you have a single list of all placeholders.
 * @returns The string with placeholders substituted.
 */
export declare const bulkApply: (str: string, context?: {
    [key: string]: string;
} | undefined, customPlaceholders?: Placeholder[], defaultPlaceholders?: Placeholder[], allPlaceholders?: Placeholder[]) => Promise<string>;
/**
 * Object for managing placeholder application.
 */
export declare const PLApplicator: {
    applyToString: (str: string, context?: {
        [key: string]: unknown;
    } | undefined, customPlaceholders?: Placeholder[], defaultPlaceholders?: Placeholder[], allPlaceholders?: Placeholder[]) => Promise<string>;
    applyToStrings: (strs: string[], context?: {
        [key: string]: string;
    } | undefined) => Promise<string[]>;
    applyToObjectValueWithKey: (obj: {
        [key: string]: unknown;
    }, key: string, context?: {
        [key: string]: string;
    } | undefined) => Promise<string | string[] | {
        [key: string]: unknown;
    }>;
    applyToObjectValuesWithKeys: (obj: {
        [key: string]: unknown;
    }, keys: string[], context?: {
        [key: string]: string;
    } | undefined) => Promise<{
        [key: string]: unknown;
    }>;
    checkForPlaceholders: (str: string, customPlaceholders?: Placeholder[], defaultPlaceholders?: Placeholder[], allPlaceholders?: Placeholder[]) => Promise<Placeholder[]>;
    bulkApply: (str: string, context?: {
        [key: string]: string;
    } | undefined, customPlaceholders?: Placeholder[], defaultPlaceholders?: Placeholder[], allPlaceholders?: Placeholder[]) => Promise<string>;
};
