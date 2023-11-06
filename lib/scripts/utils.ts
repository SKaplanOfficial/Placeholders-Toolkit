import { spawn } from "child_process";
import * as util from "util";

/**
 * Executes an OSA script using the `osascript` command.
 * @param script The script to execute (either a path to a file or the script itself)
 * @param args The arguments to pass to the script
 * @param language The language of the script, defaults to AppleScript
 * @returns A promise that resolves to the output of the script.
 */
export const execScript = (
  script: string,
  args: (string | boolean | number)[],
  language = "AppleScript",
  stderrCallback?: (data: string) => void
): { data: Promise<string>; sendMessage: (msg: string) => void } => {
  let data = "";
  let sendMessage: (msg: string) => void = (msg: string) => {
    msg;
  };
  const proc = spawn("osascript", [
    ...(script.startsWith("/") ? [] : ["-e"]),
    script,
    "-l",
    language,
    ...args.map((x) => x.toString()),
  ]);

  proc.stdout?.on("data", (chunk) => {
    data += chunk.toString();
  });

  proc.stderr?.on("data", (chunk) => {
    if (stderrCallback) {
      stderrCallback(chunk.toString());
    }
  });

  proc.stdin.on("error", (err) => {
    console.error(`Error writing to stdin: ${err}`);
  });

  sendMessage = async (message: string) => {
    if (message?.length > 0) {
      proc.stdin.cork();
      proc.stdin.write(`${message}\r\n`);
      proc.stdin.pipe(proc.stdin, { end: false });
      process.nextTick(() => proc.stdin.uncork());
    }
  };

  const waitForFinish = async () => {
    while (
      proc.stdout?.readable &&
      proc.stderr?.readable &&
      proc.stdin?.writable
    ) {
      await util.promisify(setTimeout)(100);
    }
    return data.trim();
  };

  return { data: waitForFinish(), sendMessage: sendMessage };
};