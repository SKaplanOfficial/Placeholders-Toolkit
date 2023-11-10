import { runAppleScript } from "@raycast/utils";
import { Placeholder, PlaceholderCategory, PlaceholderType } from "../../types";
import { showHUD } from "@raycast/api";

/**
 * Directive to display an alert with the provided text. The placeholder will always be replaced with an empty string.
 *
 * Syntax: `{{alert title="...":Message}}` or `{{alert timeout=[number] title="...":Message}}`
 *
 * The timeout and title are optional. If no timeout is provided, the alert will timeout after 10 seconds. The default title is "Pins". You must provide a message.
 */
const AlertDirective: Placeholder = {
  name: "alert",
  regex:
    /{{(alert)( timeout=([0-9]+))?( title="(([^{]|{(?!{)|{{[\s\S]*?}})*?)")?:(([^{]|{(?!{)|{{[\s\S]*?}})+?)}}/g,
  apply: async (str: string) => {
    const matches = str.match(
      /{{alert( timeout=([0-9]+))?( title="(([^{]|{(?!{)|{{[\s\S]*?}})*?)")?:(([^{]|{(?!{)|{{[\s\S]*?}})+?)}}/
    );
    if (matches) {
      const timeout = parseInt(matches[2]) || 10;
      const title = matches[4] || "Pins";
      const message = matches[6];
      try {
        await runAppleScript(
          `display alert "${title.replaceAll('"', "'")}"${
            message
              ? ` message "${message
                  .replaceAll('"', "'")
                  .replaceAll("\\", "\\\\")}"`
              : ""
          } giving up after ${timeout} as critical`
        );
      } catch (e) {
        if ((e as Error).message.includes("timed out")) {
          await showHUD("Alert Timed Out");
        }
      }
    }
    return { result: "" };
  },
  constant: false,
  fn: async (message: unknown, title?: unknown, timeout?: string) => {
    const messageText =
      typeof message === "function"
        ? await Promise.resolve(message())
        : message;
    const titleText =
      typeof title === "function" ? await Promise.resolve(title()) : title;
    return (
      await AlertDirective.apply(
        `{{alert${timeout ? ` timeout=${timeout}` : ""}${
          title ? ` title="${titleText}"` : ""
        }:${messageText}}}`
      )
    ).result;
  },
  example: '{{alert title="Info":Hello World}}',
  description:
    "Directive to display an alert message with an optional title and timeout. The placeholder will always be replaced with an empty string. If no timeout is provided, the alert will timeout after 10 seconds.",
  hintRepresentation: "{{alert:...}}",
  fullRepresentation: "Display Alert",
  type: PlaceholderType.InteractiveDirective,
  categories: [PlaceholderCategory.Alert],
};

export default AlertDirective;
