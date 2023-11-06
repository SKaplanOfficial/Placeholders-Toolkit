import { PlaceholderType, PlaceholderCategory, Placeholder } from "./types";
/**
 * A dummy placeholder.
 * @returns A placeholder object.
 */
export declare const dummyPlaceholder: () => Placeholder;
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
export declare const newPlaceholder: (name: string, options?: {
    /**
     * The regex to match the placeholder.
     */
    regex?: RegExp | undefined;
    /**
     * The string to replace the placeholder with. Specify either this or apply_fn. Can include other placeholders.
     */
    replace_with?: string | undefined;
    /**
     * The function to apply to the placeholder. Specify either this or replace_with.
     * @param str The string to apply the placeholder to.
     * @param context The context object to store & retrieve values from.
     * @returns An object containing the result of the placeholder and any other values to store in the context object.
     */
    apply_fn?: ((str: string, context?: {
        [key: string]: unknown;
    } | undefined) => Promise<{
        [key: string]: unknown;
        result: string;
    }>) | undefined;
    /**
     * Whether the placeholder's value is constant over the course of a single run.
     */
    constant?: boolean | undefined;
    /**
     * A brief description of the placeholder.
     */
    description?: string | undefined;
    /**
     * An example of the placeholder in use.
     */
    example?: string | undefined;
    /**
     * A representation of the placeholder to show in hints.
     */
    hintRepresentation?: string | undefined;
    /**
     * A representation of the placeholder to show in detailed explanations.
     */
    fullRepresentation?: string | undefined;
    /**
     * The type of the placeholder.
     */
    type?: PlaceholderType | undefined;
    /**
     * The categories of the placeholder.
     */
    categories?: PlaceholderCategory[] | undefined;
} | undefined) => Placeholder;
/**
 * Builds a list of placeholders from a list of placeholder names and values.
 * @param valueDict A dictionary of placeholder names and values.
 * @returns A list of placeholders.
 */
export declare const buildPlaceholdersFromValueDict: (valueDict: {
    [key: string]: string;
}) => Placeholder[];
/**
 * Builds a list of placeholders from a list of placeholder names and application functions.
 * @param fnDict A dictionary of placeholder names and application functions.
 * @returns A list of placeholders.
 */
export declare const buildPlaceholdersFromFnDict: (fnDict: {
    [key: string]: (str: string, context?: {
        [key: string]: unknown;
    } | undefined) => Promise<{
        [key: string]: unknown;
        result: string;
    }>;
}) => Placeholder[];
/**
 * Placeholder creator.
 */
export declare const PLCreator: {
    dummyPlaceholder: () => Placeholder;
    newPlaceholder: (name: string, options?: {
        /**
         * The regex to match the placeholder.
         */
        regex?: RegExp | undefined;
        /**
         * The string to replace the placeholder with. Specify either this or apply_fn. Can include other placeholders.
         */
        replace_with?: string | undefined;
        /**
         * The function to apply to the placeholder. Specify either this or replace_with.
         * @param str The string to apply the placeholder to.
         * @param context The context object to store & retrieve values from.
         * @returns An object containing the result of the placeholder and any other values to store in the context object.
         */
        apply_fn?: ((str: string, context?: {
            [key: string]: unknown;
        } | undefined) => Promise<{
            [key: string]: unknown;
            result: string;
        }>) | undefined;
        /**
         * Whether the placeholder's value is constant over the course of a single run.
         */
        constant?: boolean | undefined;
        /**
         * A brief description of the placeholder.
         */
        description?: string | undefined;
        /**
         * An example of the placeholder in use.
         */
        example?: string | undefined;
        /**
         * A representation of the placeholder to show in hints.
         */
        hintRepresentation?: string | undefined;
        /**
         * A representation of the placeholder to show in detailed explanations.
         */
        fullRepresentation?: string | undefined;
        /**
         * The type of the placeholder.
         */
        type?: PlaceholderType | undefined;
        /**
         * The categories of the placeholder.
         */
        categories?: PlaceholderCategory[] | undefined;
    } | undefined) => Placeholder;
    buildPlaceholdersFromValueDict: (valueDict: {
        [key: string]: string;
    }) => Placeholder[];
    buildPlaceholdersFromFnDict: (fnDict: {
        [key: string]: (str: string, context?: {
            [key: string]: unknown;
        } | undefined) => Promise<{
            [key: string]: unknown;
            result: string;
        }>;
    }) => Placeholder[];
};
