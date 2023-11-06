"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@raycast/utils");
const name = "Orion";
const version = async () => {
    return await (0, utils_1.runAppleScript)(`tell application "Orion" to return version`);
};
const bundleID = async () => {
    return await (0, utils_1.runAppleScript)(`tell application "Orion" to return id`);
};
const bundlePath = async () => {
    return await (0, utils_1.runAppleScript)(`tell application "Orion" to return POSIX path of (path to it)`);
};
const currentURL = async () => {
    return (0, utils_1.runAppleScript)(`try
    tell application "Orion"
      return URL of current tab of window 1
    end tell
  end try`);
};
const currentTabText = async () => {
    return await runJSInActiveTab(`document.body.innerText`);
};
const runJSInActiveTab = async (script) => {
    return await (0, utils_1.runAppleScript)(`tell application "Orion"
    set theTab to current tab of window 1
    do JavaScript "try {
                ${script}
              } catch {
                '';
              }" in theTab
  end tell`);
};
const Orion = {
    name,
    version,
    bundleID,
    bundlePath,
    currentURL,
    currentTabText,
    runJSInActiveTab,
};
exports.default = Orion;