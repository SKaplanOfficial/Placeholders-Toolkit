import { Placeholder } from "./types";
/**
 * Loads a *single* placeholder from a JSON string.
 * @param jsonString The JSON string to load a placeholder from.
 * @returns A placeholder object.
 */
export declare const loadPlaceholderFromJSONString: (jsonString: string) => Placeholder | undefined;
/**
 * Loads *multiple* placeholders from a JSON string.
 * @param jsonString The JSON string to load placeholders from.
 * @returns An array of placeholder objects.
 */
export declare const loadPlaceholdersFromJSONString: (jsonString: string) => Placeholder[];
/**
 * Loads placeholders from a JSON file.
 * @returns An array of placeholder objects.
 */
export declare const loadPlaceholdersFromFile: (filepath: string) => Promise<Placeholder[]>;
/**
 * Placeholder loader.
 */
export declare const PLLoader: {
    loadPlaceholderFromJSONString: (jsonString: string) => Placeholder | undefined;
    loadPlaceholdersFromJSONString: (jsonString: string) => Placeholder[];
    loadPlaceholdersFromFile: (filepath: string) => Promise<Placeholder[]>;
};
