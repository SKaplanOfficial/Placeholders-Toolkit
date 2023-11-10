import { Placeholder, PlaceholderCategory, PlaceholderType } from "../types";
import { chooseFile } from "../scripts/system";

/**
 * Directive to prompt the user to choose one or more files. The placeholder will be replaced with the space-separated list of quoted file paths.
 * 
 * Syntax: `{{chooseFile multiple=[true/false]}}`
 */
const ChooseFileDirective: Placeholder = {
  name: "chooseFile",
  regex: /{{chooseFile( multiple=(true|false))?}}/g,
  apply: async (str: string) => {
    const multiple = str.match(/(?<=(multiple=))(true|false)/)?.[0];
    const files = await chooseFile(multiple === "true");
    return { result: `"${files.join('" "')}"` };
  },
  constant: false,
  fn: async (multiple = "false") =>
    (await ChooseFileDirective.apply(`{{chooseFile multiple=${multiple}}}`))
      .result,
  example: "{{chooseFile multiple=true}}",
  description:
    "Directive to prompt the user to choose one or more files. The placeholder will be replaced with the space-separated list of quoted file paths.",
  hintRepresentation: "{{chooseFile}}",
  fullRepresentation: "Choose File",
  type: PlaceholderType.InteractiveDirective,
  categories: [PlaceholderCategory.Files],
};

export default ChooseFileDirective;
