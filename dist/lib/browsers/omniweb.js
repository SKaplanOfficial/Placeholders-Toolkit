"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@raycast/utils");
const name = "OmniWeb";
const version = async () => {
    return await (0, utils_1.runAppleScript)(`tell application "OmniWeb" to return version`);
};
const bundleID = async () => {
    return await (0, utils_1.runAppleScript)(`tell application "OmniWeb" to return id`);
};
const bundlePath = async () => {
    return await (0, utils_1.runAppleScript)(`tell application "OmniWeb" to return POSIX path of (path to it)`);
};
const currentURL = async () => {
    return (0, utils_1.runAppleScript)(`tell application "OmniWeb" to return address of active tab of browser 1`);
};
const currentTabText = async () => {
    return await runJSInActiveTab(`document.body.innerText`);
};
const runJSInActiveTab = async (script) => {
    return await (0, utils_1.runAppleScript)(`tell application "OmniWeb"
    do script "try {
      ${script}
    } catch {
      '';
    }" window browser 1
  end tell`);
};
const OmniWeb = {
    name,
    version,
    bundleID,
    bundlePath,
    currentURL,
    currentTabText,
    runJSInActiveTab,
};
exports.default = OmniWeb;
