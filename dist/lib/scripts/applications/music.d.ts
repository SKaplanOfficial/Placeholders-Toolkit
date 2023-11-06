/**
 * Gets the name of the currently playing track or stream of Music.app.
 *
 * @returns A promise resolving to the track/stream name as a string.
 */
export declare const getCurrentTrack: () => Promise<string>;
/**
 * Gets the list of track names in Music.app.
 *
 * @returns A promise resolving to the list of track names as a string.
 */
export declare const getTrackNames: () => Promise<string>;
