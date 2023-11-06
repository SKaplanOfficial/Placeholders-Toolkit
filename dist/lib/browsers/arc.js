"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@raycast/utils");
const name = "Arc";
const version = async () => {
    return await (0, utils_1.runAppleScript)(`tell application "Arc" to return version`);
};
const bundleID = async () => {
    return await (0, utils_1.runAppleScript)(`tell application "Arc" to return id`);
};
const bundlePath = async () => {
    return await (0, utils_1.runAppleScript)(`tell application "Arc" to return POSIX path of (path to it)`);
};
const currentURL = async () => {
    return await (0, utils_1.runAppleScript)(`try
  tell application "Arc"
    return URL of active tab of window 1
  end tell
end try`);
};
const currentTabText = async () => {
    return await runJSInActiveTab(`document.body.innerText`);
};
const runJSInActiveTab = async (script) => {
    return await (0, utils_1.runAppleScript)(`tell application "Arc"
  set theTab to active tab of front window
  set js to "try {
    ${script}
  } catch {
    '';
  }"
  
  tell front window's active tab
    return execute javascript js
  end tell
end tell`);
};
const Arc = {
    name,
    version,
    bundleID,
    bundlePath,
    currentURL,
    currentTabText,
    runJSInActiveTab,
};
exports.default = Arc;
