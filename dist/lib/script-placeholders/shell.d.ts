import { Placeholder } from "../types";
/**
   * Placeholder for output of a shell script. If the script fails, this placeholder will be replaced with an empty string. No sanitization is done on the script input; the expectation is that users will only use this placeholder with trusted scripts.
   */
declare const ShellScriptPlaceholder: Placeholder;
export default ShellScriptPlaceholder;
