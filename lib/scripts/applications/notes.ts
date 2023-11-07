import { runAppleScript } from "@raycast/utils";

/**
 * Gets the plaintext of the most recently edited note.
 *
 * @returns A promise resolving to the note's plaintext as a string.
 */
export const getLastNote = async (): Promise<string> => {
  return runAppleScript(`try
    tell application "Notes"
      get plaintext of note 1
    end tell
  end try`);
};
