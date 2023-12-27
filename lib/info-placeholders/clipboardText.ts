import { Clipboard } from "@raycast/api";
import { Placeholder, PlaceholderCategory, PlaceholderType } from "../types";
import { RequireValue } from "../rules";

enum EntriesSpecifierType {
  Range = "range",
  List = "list",
}

/**
 * Placeholder for the text currently stored in the clipboard. If the clipboard is empty, this will be replaced with an empty string. Most clipboard content supplies a string format, such as file names when copying files in Finder.
 * 
 * If the `offsets` parameter is provided, the placeholder will be replaced with a list of one or more previous clipboard text entries separated by newlines. The `offsets` parameter can be a list of numbers or a range of numbers, e.g. `1, 2, 3`, `1-3`, and `1..3` are all treated equally. If the `offsets` parameter is not provided, the placeholder will be replaced with the text currently stored in the clipboard. To include the current clipboard text in addition to previous entries, begin the list with `0`.
 *
 * Syntax: `{{clipboardText}}` or `{{clipboardText offsets=[1, 2, 3]}}` or `{{clipboardText offsets=[1..3]}}`
 */
const ClipboardTextPlaceholder: Placeholder = {
  name: "clipboardText",
  regex:
    /{{(clipboardText|clipboard)( offsets=((([0-9])((-|\.\.)([0-9]*)|(, ?[0-9]+)*))|\[(([0-9])((-|\.\.)([0-9]*)|(, ?[0-9]+)*))\]))?}}/g,
  apply: async (str: string) => {
    const matches = str.match(
      /{{(clipboardText|clipboard)( offsets=((([0-9])((-|\.\.)([0-9]*)|(, ?[0-9]+)*))|\[(([0-9])((-|\.\.)([0-9]*)|(, ?[0-9]+)*))\]))?}}/
    );
    if (!matches) {
      return { result: "" };
    }

    const entries = matches[3];
    const offsets = [];

    if (entries) {
      const specifierType = entries.includes("-") || entries.includes("..")
        ? EntriesSpecifierType.Range
        : EntriesSpecifierType.List;
      if (specifierType === EntriesSpecifierType.Range) {
        const range = entries.replaceAll(/(\[|\])/g, "").split(/(-|\.\.)/)
        const start = parseInt(range[0]);
        const end = parseInt(range[2]);
        for (let i = start; i <= end; i++) {
          offsets.push(i);
        }
      } else {
        const list = entries.replaceAll(/(\[|\])/g, "").split(",");
        for (const entry of list) {
          offsets.push(parseInt(entry.trim()));
        }
      }
    }

    if (offsets.length === 0) {
      offsets.push(0);
    }

    try {
      let text = "";
      for (const offset of offsets) {
        text += `\n${(await Clipboard.readText({ offset })) || ""}`;
      }
      return { result: text.trim() };
    } catch (e) {
      return { result: "" };
    }
  },
  rules: [RequireValue(Clipboard.readText)],
  constant: false,
  fn: async () =>
    (await ClipboardTextPlaceholder.apply("{{clipboardText}}")).result,
  example: "Summarize this: {{clipboardText}}",
  description:
    "Replaced with the text currently stored in the clipboard. If the clipboard is empty, this will be replaced with an empty string. Most clipboard content supplies a string format, such as file names when copying files in Finder.",
  hintRepresentation: "{{clipboardText}}",
  fullRepresentation: "Clipboard Text",
  type: PlaceholderType.Informational,
  categories: [PlaceholderCategory.Device],
};

export default ClipboardTextPlaceholder;
