import { Placeholder } from "../../types";
/**
 * Directive to display a dialog with the provided text. The placeholder will be replaced with an empty string unless `input=true` is provided, in which case the placeholder will be replaced with the user's input. If the user cancels the dialog, the placeholder will be replaced with an empty string.
 *
 * Syntax: `{{dialog input=[true/false] timeout=[number] title="...":Message}}`
 *
 * The input setting, timeout, and title are optional. If no timeout is provided, the dialog will timeout after 30 seconds. If no title is provided, the title will be "Pins". The default input setting is `false`. You must provide a message.
 */
declare const DialogDirective: Placeholder;
export default DialogDirective;
