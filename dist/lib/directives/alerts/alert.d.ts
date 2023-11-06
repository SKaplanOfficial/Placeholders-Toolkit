import { Placeholder } from "../../types";
/**
 * Directive to display an alert with the provided text. The placeholder will always be replaced with an empty string.
 *
 * Syntax: `{{alert title="...":Message}}` or `{{alert timeout=[number] title="...":Message}}`
 *
 * The timeout and title are optional. If no timeout is provided, the alert will timeout after 10 seconds. The default title is "Pins". You must provide a message.
 */
declare const AlertDirective: Placeholder;
export default AlertDirective;
