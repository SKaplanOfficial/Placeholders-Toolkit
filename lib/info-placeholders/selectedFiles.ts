import { RequireValue } from "../rules";
import { getSelectedFiles } from "../scripts";
import { Placeholder, PlaceholderCategory, PlaceholderType } from "../types";

/**
 * Placeholder for the paths of the currently selected files in Finder as a comma-separated list. If no files are selected, this will be replaced with an empty string.
 *
 * Syntax: `{{selectedFiles}}` or `{{selectedFile}}` or `{{files}}`
 */
const SelectedFilesPlaceholder: Placeholder = {
  name: "selectedFiles",
  regex: /{{(selectedFiles|selectedFile|files)}}/g,
  rules: [RequireValue(async () => (await getSelectedFiles()).paths)],
  apply: async (str: string, context?: { [key: string]: unknown }) => {
    try {
      const files =
        context && "selectedFiles" in context
          ? (context["selectedFiles"] as string[])
          : (await getSelectedFiles()).paths;
      return { result: files.join(", "), selectedFiles: files };
    } catch (e) {
      return { result: "", selectedFiles: [] };
    }
  },
  result_keys: ["selectedFiles"],
  constant: true,
  fn: async () =>
    (await SelectedFilesPlaceholder.apply("{{selectedFiles}}")).result,
  example: "Count the number of text files in this list: {{selectedFiles}}",
  description:
    "Replaced with the paths of the currently selected files in Finder as a comma-separated list. If no files are selected, this will be replaced with an empty string.",
  hintRepresentation: "{{selectedFiles}}",
  fullRepresentation: "Selected File Paths",
  type: PlaceholderType.Informational,
  categories: [PlaceholderCategory.Files],
};

export default SelectedFilesPlaceholder;
