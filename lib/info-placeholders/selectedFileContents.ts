import { RequireValue } from "../rules";
import { getSelectedFiles } from "../scripts";
import { Placeholder, PlaceholderCategory, PlaceholderType } from "../types";
import * as fs from "fs";

/**
 * Placeholder for the contents of the currently selected files in Finder as a newline-separated list. If no files are selected, this placeholder will not be replaced.
 * 
 * Syntax: `{{selectedFileContents}}` or `{{selectedFilesContents}}` or `{{selectedFileContent}}` or `{{selectedFilesContent}}` or `{{selectedFileText}}` or `{{selectedFilesText}}` or `{{contents}}`
 */
const SelectedFileContentsPlaceholder: Placeholder = {
  name: "selectedFileContents",
  regex:
    /{{(selectedFileContents|selectedFilesContents|selectedFileContent|selectedFilesContent|selectedFileText|selectedFilesText|contents)}}/g,
  rules: [RequireValue(async () => (await getSelectedFiles()).paths)],
  apply: async () => {
    try {
      const files = await getSelectedFiles();
      if (files.paths.length === 0) return { result: "" };
      const fileContents = files.paths.map((path) => fs.readFileSync(path));
      const res = fileContents.join("\n\n").replaceAll(/({{|}})/g, "");
      return { result: res, selectedFileContents: res };
    } catch (e) {
      console.error(e);
    }
    return { result: "" };
  },
  result_keys: ["selectedFileContents"],
  constant: true,
  fn: async () =>
    (await SelectedFileContentsPlaceholder.apply("{{selectedFileContents}}"))
      .result,
  example: "Summarize this: {{selectedFileContents}}",
  description:
    "Replaced with the contents of the currently selected files in Finder as a newline-separated list.",
  hintRepresentation: "{{selectedFileContents}}",
  fullRepresentation: "Selected File Contents",
  type: PlaceholderType.Informational,
  categories: [PlaceholderCategory.Files],
};

export default SelectedFileContentsPlaceholder;
