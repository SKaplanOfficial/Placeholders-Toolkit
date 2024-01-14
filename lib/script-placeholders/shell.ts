import { execSync } from "child_process";
import { Placeholder, PlaceholderCategory, PlaceholderType } from "../types";

/**
 * Placeholder for output of a shell script. If the script fails, this placeholder will be replaced with an empty string. No sanitization is done on the script input; the expectation is that users will only use this placeholder with trusted scripts.
 * 
 * Syntax: `{{shell [bin]:...}}`, where `...` is the shell script to run and `[bin]` is the path to the shell to run the script in. The bin parameter is optional; if not provided, the script will be run using `/bin/zsh`.
 */
const ShellScriptPlaceholder: Placeholder = {
  name: "shell",
  regex: /{{shell( .*)?:(.|[ \n\r\s])*?}}/g,
  apply: async (str: string) => {
    try {
      const bin =
        str.match(/(?<=shell)( .*)?(?=:(.|[ \n\r\s])*?}})/)?.[0]?.trim() ||
        "/bin/zsh";
      const pathScript = `export PATH=$(${bin} -ilc "echo -n \\$PATH") &&`;
      const script =
        pathScript + str.match(/(?<=shell( .*)?:)(.|[ \n\r\s])*?(?=}})/)?.[0];
      if (!script) return { result: "", shell: "" };
      const res = execSync(script, { encoding: "ascii", shell: bin })
        .toString()
        .trim();
      return { result: res, shell: res };
    } catch (e) {
      return { result: "", shell: "" };
    }
  },
  constant: false,
  fn: async (script: string, bin = "/bin/zsh") =>
    (await ShellScriptPlaceholder.apply(`{{shell ${bin}:${script}}}`)).result,
  example: '{{shell:echo "Hello World"}}',
  description:
    "Placeholder for output of a shell script. If the script fails, this placeholder will be replaced with an empty string.",
  hintRepresentation: "{{shell:...}}",
  fullRepresentation: "Run Shell Script",
  type: PlaceholderType.Script,
  categories: [PlaceholderCategory.Custom],
};

export default ShellScriptPlaceholder;
