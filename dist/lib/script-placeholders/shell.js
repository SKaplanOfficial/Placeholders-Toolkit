"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const types_1 = require("../types");
/**
 * Placeholder for output of a shell script. If the script fails, this placeholder will be replaced with an empty string. No sanitization is done on the script input; the expectation is that users will only use this placeholder with trusted scripts.
 */
const ShellScriptPlaceholder = {
    name: "shell",
    regex: /{{shell( .*)?:(.|[ \\n\\r\\s])*?}}/g,
    apply: async (str) => {
        try {
            const bin = str.match(/(?<=shell)( .*)?(?=:(.|[ \n\r\s])*?}})/)?.[0]?.trim() ||
                "/bin/zsh";
            const pathScript = `export PATH=$(${bin} -ilc "echo -n \\$PATH") &&`;
            const script = pathScript + str.match(/(?<=shell( .*)?:)(.|[ \n\r\s])*?(?=}})/)?.[0];
            if (!script)
                return { result: "", shell: "" };
            const res = (0, child_process_1.execSync)(script, { encoding: "ascii", shell: bin })
                .toString()
                .trim();
            return { result: res, shell: res };
        }
        catch (e) {
            return { result: "", shell: "" };
        }
    },
    constant: false,
    fn: async (script, bin = "/bin/zsh") => (await ShellScriptPlaceholder.apply(`{{shell ${bin}:${script}}}`)).result,
    example: '{{shell:echo "Hello World"}}',
    description: "Placeholder for output of a shell script. If the script fails, this placeholder will be replaced with an empty string.",
    hintRepresentation: "{{shell:...}}",
    fullRepresentation: "Run Shell Script",
    type: types_1.PlaceholderType.Script,
    categories: [types_1.PlaceholderCategory.Custom],
};
exports.default = ShellScriptPlaceholder;
