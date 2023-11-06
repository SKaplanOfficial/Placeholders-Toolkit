import { Placeholder } from "../types";
/**
   * Placeholder for output of an AppleScript script. If the script fails, this placeholder will be replaced with an empty string. No sanitization is done in the script input; the expectation is that users will only use this placeholder with trusted scripts.
   */
declare const AppleScriptPlaceholder: Placeholder;
export default AppleScriptPlaceholder;
