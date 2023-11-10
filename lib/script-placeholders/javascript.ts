import { Placeholder, PlaceholderCategory, PlaceholderType } from "../types";

/**
 * Placeholder for output of a JavaScript script. If the script fails, this placeholder will be replaced with an empty string. The script is run in a sandboxed environment.
 *
 * Syntax: `{{js target="[browser]":...}}`, where `...` is the JavaScript script to run and `[browser]` is the name of the browser to run the script in. The target parameter is optional; if not provided, the script will be run in a Node.js environment.
 */
const JavaScriptPlaceholder: Placeholder = {
  name: "js",
  regex: /{{(js|JS)( target="(.*?)")?:(([^{]|{(?!{)|{{[\\s\\S]*?}})*?)}}/g,
  apply: async () => {
    return { result: "", js: "" };
  },
  constant: false,
  fn: async (script: string, target?: string) =>
    (
      await JavaScriptPlaceholder.apply(
        `{{js${target == undefined ? `` : ` target="${target}"`}:${script}}}`
      )
    ).result,
  example: '{{js:log("Hello World")}}',
  description:
    "Placeholder for output of a JavaScript script. If the script fails, this placeholder will be replaced with an empty string. The script is run in a sandboxed environment.",
  hintRepresentation: "{{js:...}}",
  fullRepresentation: "Run JavaScript",
  type: PlaceholderType.Script,
  categories: [PlaceholderCategory.Custom],
};

export default JavaScriptPlaceholder;
