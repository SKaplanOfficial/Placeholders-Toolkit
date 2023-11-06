import { Extension, JSONObject } from "./types";
import { Browser } from "./browsers";
/**
 * The browsers from which the current URL can be obtained.
 */
export declare const SupportedBrowsers: Browser[];
/**
 * Gets the active browser.
 * @returns A promise resolving to the active browser, or undefined if another kind of application is active.
 */
export declare const getActiveBrowser: () => Promise<Browser | undefined>;
/**
 * Executes the specified JavaScript in the active tab of the target browser.
 * @param script The JavaScript to execute.
 * @param browserName The name of the browser to execute the script in. If not specified, the active browser will be used.
 * @returns A promise resolving to the result of executing the JavaScript.
 */
export declare const runJSInActiveTab: (script: string, browserName?: string) => Promise<string>;
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
/**
 * Gets the JSON objects returned from a URL.
 *
 * @param URL The url to a .json document.
 * @returns The JSON as a {@link JSONObject}.
 */
export declare const getJSONResponse: (URL: string) => Promise<JSONObject>;
/**
 * Gets the English transcript of a YouTube video specified by its ID.
 * @param videoId The ID of the YouTube video.
 * @returns A promise resolving to the transcript as a string, or "No transcript available." if there is no transcript.
 */
export declare const getYouTubeVideoTranscriptById: (videoId: string) => Promise<string>;
/**
 * Gets the English transcript of a YouTube video specified by its URL.
 * @param videoURL The URL of the YouTube video.
 * @returns A promise resolving to the transcript as a string, or "No transcript available." if there is no transcript.
 */
export declare const getYouTubeVideoTranscriptByURL: (videoURL: string) => Promise<string>;
/**
 * Gets the ID of the first YouTube video matching the search text.
 * @param searchText The text to search for.
 * @returns The ID of the first matching video.
 */
export declare const getMatchingYouTubeVideoID: (searchText: string) => Promise<string>;
/**
 * Gets the weather forecast from open-meteo.com.
 *
 * @param days The number of days to get the forecast for (either 1 or 7)
 * @returns The forecast as a JSON object.
 */
export declare const getWeatherData: (days: number) => Promise<JSONObject>;
/**
 * Gets the list of extensions installed in Raycast.
 * @returns The list of extensions as an array of {@link Extension} objects.
 */
export declare const getExtensions: () => Promise<Extension[]>;
