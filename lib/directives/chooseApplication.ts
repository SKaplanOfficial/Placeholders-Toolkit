import { Placeholder, PlaceholderCategory, PlaceholderType } from "../types";
import { chooseApplication } from "../scripts/system";

/**
 * Directive to prompt the user to choose one or more applications. The placeholder will be replaced with the space-separated list of quoted application bundle paths.
 * 
 * Syntax: `{{chooseApplication multiple=[true/false]}}`
 */
const ChooseApplicationDirective: Placeholder = {
  name: "chooseApplication",
  regex: /{{chooseApplication( multiple=(true|false))?}}/g,
  apply: async (str: string) => {
    const multiple = str.match(/(?<=(multiple=))(true|false)/)?.[0];
    const apps = await chooseApplication(multiple === "true");
    return { result: `"${apps.join('" "')}"` };
  },
  constant: false,
  fn: async (multiple = "false") =>
    (
      await ChooseApplicationDirective.apply(
        `{{chooseApplication multiple=${multiple}}}`
      )
    ).result,
  example: "{{chooseApplication multiple=true}}",
  description:
    "Directive to prompt the user to choose one or more applications. The placeholder will be replaced with the space-separated list of quoted application bundle paths.",
  hintRepresentation: "{{chooseApplication}}",
  fullRepresentation: "Choose Application",
  type: PlaceholderType.InteractiveDirective,
  categories: [PlaceholderCategory.Applications, PlaceholderCategory.Files],
};

export default ChooseApplicationDirective;
