import { Placeholder } from "../../types";
/**
 * Directive to speak the provided text. The placeholder will always be replaced with an empty string.
 *
 * Syntax: `{{say voice="[voice]" speed=[number] pitch=[number] volume=[number]:Message}}`
 *
 * All arguments are optional. If no voice, speed, pitch, or volume are provided, the system defaults will be used.
 */
declare const SayDirective: Placeholder;
export default SayDirective;
