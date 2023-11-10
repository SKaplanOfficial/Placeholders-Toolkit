import { Placeholder, PlaceholderCategory, PlaceholderType } from "../types";
import { chooseFile } from "../scripts/system";

/**
 * Directive to prompt the user to choose one or more folders. The placeholder will be replaced with the space-separated list of quoted folder paths.
 * 
 * Syntax: `{{chooseFolder multiple=[true/false]}}`
 */
const ChooseFolderDirective: Placeholder = {
  name: "chooseFolder",
  regex: /{{chooseFolder( multiple=(true|false))?}}/g,
  apply: async (str: string) => {
    const multiple = str.match(/(?<=(multiple=))(true|false)/)?.[0];
    const folders = await chooseFile(multiple === "true", true);
    return { result: `"${folders.join('" "')}"` };
  },
  constant: false,
  fn: async (multiple = "false") =>
    (await ChooseFolderDirective.apply(`{{chooseFolder multiple=${multiple}}}`))
      .result,
  example: "{{chooseFolder multiple=true}}",
  description:
    "Directive to prompt the user to choose one or more folders. The placeholder will be replaced with the space-separated list of quoted folder paths.",
  hintRepresentation: "{{chooseFolder}}",
  fullRepresentation: "Choose Folder",
  type: PlaceholderType.InteractiveDirective,
  categories: [PlaceholderCategory.Files],
};

export default ChooseFolderDirective;
