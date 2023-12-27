import { Placeholder, PlaceholderCategory, PlaceholderType } from "../types";
import { addFileToSelection } from "../scripts";

/**
 * Directive to select a file. The placeholder will always be replaced with an empty string.
 * 
 * Syntax: `{{selectFile:...}}`, where `...` is the POSIX path to the file to select.
 */
const SelectFileDirective: Placeholder = {
  name: "selectFile",
  regex: /{{(selectFile)(:[\s\S]*?)?}}/g,
  apply: async (str: string) => {
    const file = str.match(/(?<=(selectFile:))[\s\S]*?(?=}})/)?.[0];
    if (!file) return { result: "" };
    await addFileToSelection(file);
    return { result: "" };
  },
  constant: false,
  fn: async (path: unknown) => {
    const pathText = typeof path === "function" ? await Promise.resolve(path()) : path;
    return (await SelectFileDirective.apply(`{{selectFile:${pathText}}}`)).result
  },
  example: "{{selectFile:/Users/username/Desktop/file.txt}}",
  description:
    "Directive to a select file. The placeholder will always be replaced with an empty string.",
  hintRepresentation: "{{selectFile:...}}",
  fullRepresentation: "Select File At Path",
  type: PlaceholderType.InteractiveDirective,
  categories: [PlaceholderCategory.Files, PlaceholderCategory.Applications],
};

export default SelectFileDirective;
