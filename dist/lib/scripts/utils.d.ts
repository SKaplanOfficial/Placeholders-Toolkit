/**
 * Executes an OSA script using the `osascript` command.
 * @param script The script to execute (either a path to a file or the script itself)
 * @param args The arguments to pass to the script
 * @param language The language of the script, defaults to AppleScript
 * @returns A promise that resolves to the output of the script.
 */
export declare const execScript: (script: string, args: (string | boolean | number)[], language?: string, stderrCallback?: ((data: string) => void) | undefined) => {
    data: Promise<string>;
    sendMessage: (msg: string) => void;
};
