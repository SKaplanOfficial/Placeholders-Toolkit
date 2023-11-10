import { LocalStorage } from "@raycast/api";
import { Placeholder, PlaceholderCategory, PlaceholderType } from "../../types";

/**
 * Directive to increment a persistent counter variable by 1. Replaced with the new value of the counter.
 * 
 * Syntax: `{{increment:x}}`, where `x` is the name of the counter variable. If the variable does not exist, it will be created with a value of 1.
 */
const IncrementPersistentVariablePlaceholder: Placeholder = {
  name: "increment",
  regex: /{{increment:[\\s\\S]*?}}/g,
  apply: async (str: string) => {
    const name = str.match(/(?<=(increment:))[\s\S]*?(?=}})/)?.[0];
    const identifier = `id-${name}`;
    const value = parseInt((await LocalStorage.getItem(identifier)) || "0") + 1;
    await LocalStorage.setItem(identifier, value.toString());
    return { result: value.toString() };
  },
  constant: false,
  fn: async (id: string) =>
    (await IncrementPersistentVariablePlaceholder.apply(`{{increment:${id}}}`))
      .result,
  example: "{{increment:counter}}",
  description:
    "Directive to increment a persistent counter variable by 1. Returns the new value of the counter.",
  hintRepresentation: "{{increment:x}}",
  fullRepresentation: "Increment Persistent Counter Variable",
  type: PlaceholderType.StaticDirective,
  categories: [PlaceholderCategory.Memory],
};

export default IncrementPersistentVariablePlaceholder;
