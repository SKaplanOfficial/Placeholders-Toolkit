"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@raycast/utils");
const _1 = require(".");
const name = "SigmaOS";
const version = async () => {
    return await (0, utils_1.runAppleScript)(`tell application "SigmaOS" to return version`);
};
const bundleID = async () => {
    return await (0, utils_1.runAppleScript)(`tell application "SigmaOS" to return id`);
};
const bundlePath = async () => {
    return await (0, utils_1.runAppleScript)(`tell application "SigmaOS" to return POSIX path of (path to it)`);
};
const currentURL = async () => {
    return (0, utils_1.runAppleScript)(`tell application "SigmaOS" to return URL of active tab of window 1`);
};
const currentTabText = async () => {
    const url = await currentURL();
    return await _1.utils.getTextOfWebpage(url);
};
const runJSInActiveTab = async (script) => {
    // Cannot actually run JS in SigmaOS, so just execute JS on the HTML of the current tab.
    const url = await currentURL();
    const html = await _1.utils.getURLHTML(url);
    return await _1.utils.runJSAgainstHTML(script, html);
};
const SigmaOS = {
    name,
    version,
    bundleID,
    bundlePath,
    currentURL,
    currentTabText,
    runJSInActiveTab,
};
exports.default = SigmaOS;
