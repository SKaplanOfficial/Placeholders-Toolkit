"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.execScript = void 0;
const child_process_1 = require("child_process");
const util = __importStar(require("util"));
/**
 * Executes an OSA script using the `osascript` command.
 * @param script The script to execute (either a path to a file or the script itself)
 * @param args The arguments to pass to the script
 * @param language The language of the script, defaults to AppleScript
 * @returns A promise that resolves to the output of the script.
 */
const execScript = (script, args, language = "AppleScript", stderrCallback) => {
    let data = "";
    let sendMessage = (msg) => {
        msg;
    };
    const proc = (0, child_process_1.spawn)("osascript", [
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
    sendMessage = async (message) => {
        if (message?.length > 0) {
            proc.stdin.cork();
            proc.stdin.write(`${message}\r\n`);
            proc.stdin.pipe(proc.stdin, { end: false });
            process.nextTick(() => proc.stdin.uncork());
        }
    };
    const waitForFinish = async () => {
        while (proc.stdout?.readable &&
            proc.stderr?.readable &&
            proc.stdin?.writable) {
            await util.promisify(setTimeout)(100);
        }
        return data.trim();
    };
    return { data: waitForFinish(), sendMessage: sendMessage };
};
exports.execScript = execScript;
