import { runAppleScript } from "@raycast/utils";

/**
 * Gets the name of the currently playing track or stream of Music.app.
 *
 * @returns A promise resolving to the track/stream name as a string.
 */
export const getCurrentTrack = async (): Promise<string> => {
  return runAppleScript(`try
    tell application "Music"
      set trackName to current stream title
      if trackName is missing value then
        set trackName to name of current track
      end if
      return trackName
    end tell
  end try`);
};

/**
 * Gets the list of track names in Music.app.
 *
 * @returns A promise resolving to the list of track names as a string.
 */
export const getTrackNames = async (): Promise<string> => {
  return runAppleScript(`try
    tell application "Music"
      get name of tracks
    end tell
  end try`);
};
