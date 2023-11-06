"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLastNote = void 0;
const utils_1 = require("@raycast/utils");
/**
 * Gets the plaintext of the most recently edited note.
 *
 * @returns A promise resolving to the note's plaintext as a string.
 */
const getLastNote = async () => {
    return (0, utils_1.runAppleScript)(`try
    tell application "Notes"
      get plaintext of note 1
    end tell
  end try`);
};
exports.getLastNote = getLastNote;
