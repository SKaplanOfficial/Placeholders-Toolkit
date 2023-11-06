/**
 * Gets the raw HTML of a URL.
 *
 * @param URL The URL to get the HTML of.
 * @returns The HTML as a string.
 */
export declare const getURLHTML: (URL: string) => Promise<string>;
/**
 * Gets the visible text of a URL.
 *
 * @param URL The URL to get the visible text of.
 * @returns A promise resolving to the visible text as a string.
 */
export declare const getTextOfWebpage: (URL: string) => Promise<string>;
export declare const runJSAgainstHTML: (script: string, html?: string, url?: string) => Promise<string>;
