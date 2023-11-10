import { Clipboard, environment, showHUD, showToast } from "@raycast/api";
import { Placeholder, PlaceholderCategory, PlaceholderType } from "../types";

/**
 * Directive to copy the provided text to the clipboard. The placeholder will always be replaced with an empty string.
 * 
 * Syntax: `{{copy:...}}`, where `...` is the text to copy to the clipboard.
 */
const CopyDirective: Placeholder = {
  name: "copy",
  regex: /{{(copy):[\s\S]*?}}/g,
  apply: async (str: string) => {
    const text = str.match(/(?<=(copy:))[\s\S]*?(?=}})/)?.[0];
    if (!text) return { result: "" };
    await Clipboard.copy(text);
    if (environment.commandName == "index") {
      await showHUD("Copied to Clipboard");
    } else {
      await showToast({ title: "Copied to Clipboard" });
    }
    return { result: "" };
  },
  constant: false,
  fn: async (content: unknown) => {
    if (typeof content === "function") {
      return (
        await CopyDirective.apply(
          `{{copy:${await Promise.resolve(content())}}}`
        )
      ).result;
    }
    return (await CopyDirective.apply(`{{copy:${content}}}`)).result;
  },
  example: "{{copy:Hello World}}",
  description:
    "Directive to copy the provided text to the clipboard. The placeholder will always be replaced with an empty string.",
  hintRepresentation: "{{copy:...}}",
  fullRepresentation: "Copy To Clipboard",
  type: PlaceholderType.InteractiveDirective,
  categories: [PlaceholderCategory.Device, PlaceholderCategory.Applications],
};

export default CopyDirective;
