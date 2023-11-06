"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTrackNames = exports.getCurrentTrack = void 0;
const utils_1 = require("@raycast/utils");
/**
 * Gets the name of the currently playing track or stream of Music.app.
 *
 * @returns A promise resolving to the track/stream name as a string.
 */
const getCurrentTrack = async () => {
    return (0, utils_1.runAppleScript)(`try
    tell application "Music"
      set trackName to current stream title
      if trackName is missing value then
        set trackName to name of current track
      end if
      return trackName
    end tell
  end try`);
};
exports.getCurrentTrack = getCurrentTrack;
/**
 * Gets the list of track names in Music.app.
 *
 * @returns A promise resolving to the list of track names as a string.
 */
const getTrackNames = async () => {
    return (0, utils_1.runAppleScript)(`try
    tell application "Music"
      get name of tracks
    end tell
  end try`);
};
exports.getTrackNames = getTrackNames;
