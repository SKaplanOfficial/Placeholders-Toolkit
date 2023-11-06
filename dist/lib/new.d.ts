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
export declare const newPlaceholder: (name: string, regex?: RegExp, apply_fn?: ((str: string, context?: {
    [key: string]: unknown;
} | undefined) => Promise<{
    [key: string]: unknown;
    result: string;
}>) | undefined, replace_with?: string, constant?: boolean, description?: string, example?: string, hintRepresentation?: string, fullRepresentation?: string, type?: PlaceholderType, categories?: PlaceholderCategory[]) => Placeholder;
/**
 * Builds a list of placeholders from a list of placeholder names and values.
 * @param valueDict A dictionary of placeholder names and values.
 * @returns A list of placeholders.
 */
export declare const buildPlaceholdersFromValueDict: (valueDict: {
    [key: string]: string;
}) => Placeholder[];
/**
 * Placeholder creator.
 */
export declare const PLCreator: {
    newPlaceholder: (name: string, regex?: RegExp, apply_fn?: ((str: string, context?: {
        [key: string]: unknown;
    } | undefined) => Promise<{
        [key: string]: unknown;
        result: string;
    }>) | undefined, replace_with?: string, constant?: boolean, description?: string, example?: string, hintRepresentation?: string, fullRepresentation?: string, type?: PlaceholderType, categories?: PlaceholderCategory[]) => Placeholder;
    dummyPlaceholder: () => Placeholder;
    buildPlaceholdersFromValueDict: (valueDict: {
        [key: string]: string;
    }) => Placeholder[];
};
