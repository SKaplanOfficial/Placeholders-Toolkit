import { Placeholder } from "../../types";
/**
 * Directive to display a toast or HUD with the provided text. The placeholder will always be replaced with an empty string. Whether a toast or HUD is displayed depends on the context (e.g. if the Raycast window is focused, a toast will be displayed; otherwise, a HUD will be displayed).
 *
 * Syntax: `{{toast style="[success/failure/fail]" title="...":Message}}` or `{{hud style="[success/failure/fail]" title="...":Message}}`
 *
 * The style and message are optional. If no style is provided, the style will be "success". If no message is provided, the message will be empty.
 */
declare const ToastDirective: Placeholder;
export default ToastDirective;
