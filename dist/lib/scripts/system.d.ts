/**
 * Gets a list of currently installed applications.
 *
 * @returns A promise resolving to the list of apps as a string.
 */
export declare const getInstalledApplications: () => Promise<string>;
/**
 * Gets the computer's name.
 *
 * @returns A promise resolving to the computer name as a string.
 */
export declare const getComputerName: () => Promise<string>;
/**
 * Gets the current Finder directory.
 * @returns A promise resolving to the path of the current directory as a string.
 */
export declare const getCurrentDirectory: () => Promise<string>;
/**
 * Gets the application that owns the menubar.
 * @param includePaths Whether to include the path of the application.
 * @returns A promise resolving to the name of the application as a string, or an object containing the name and path if includePaths is true.
 */
export declare const getMenubarOwningApplication: (includePaths?: boolean) => Promise<string | {
    name: string;
    path: string;
}>;
/**
 * Adds a file to the current Finder selection.
 * @param filePath The path of the file to add to the selection.
 * @returns A promise that resolves to void when the AppleScript has finished running.
 */
export declare const addFileToSelection: (filePath: string) => Promise<void>;
export declare const getSelectedFiles: () => Promise<{
    paths: string[];
    csv: string;
}>;
/**
 * Gets the names of all currently running non-background applications.
 * @returns A promise that resolves to a comma-separated list of application names.
 */
export declare const getRunningApplications: () => Promise<string>;
/**
 * Gets the name of the system's language.
 * @returns A promise that resolves to the name of the system language as a string.
 */
export declare const getSystemLanguage: () => Promise<string>;
/**
 * Searches for nearby locations matching the provided query.
 * @param query The query to search for.
 * @returns A promise that resolves to a new-line-separated list of addresses.
 */
export declare const searchNearbyLocations: (query: string) => Promise<string>;
