import { runAppleScript } from "@raycast/utils";
import { Browser } from "./types";
import { utils } from ".";

const name = "SigmaOS";

const version = async () => {
  return await runAppleScript(`tell application "SigmaOS" to return version`);
};

const bundleID = async () => {
  return await runAppleScript(`tell application "SigmaOS" to return id`);
};

const bundlePath = async () => {
  return await runAppleScript(
    `tell application "SigmaOS" to return POSIX path of (path to it)`
  );
};

const currentURL = async () => {
  return runAppleScript(
    `tell application "SigmaOS" to return URL of active tab of window 1`
  );
};

// TODO: Improve this when/if SigmaOS supports getting multiple tabs via AppleScript.
const tabs = async (): Promise<{ name: string; url: string }[]> => {
  return [await currentTab()];
};

const currentTab = async (): Promise<{ name: string; url: string }> => {
  const data = await runAppleScript(`try
    set oldDelims to AppleScript's text item delimiters
    set AppleScript's text item delimiters to "\`\`\`"
    tell application "SigmaOS"
      set theData to {name, URL} of active tab of window 1
      set theData to theData as string
      set AppleScript's text item delimiters to oldDelims
      return theData
    end tell
  end try`);
  const entries = data.split("```");
  const name = entries[0];
  const url = entries[1];
  return { name, url };
};

const currentTabText = async () => {
  const url = await currentURL();
  return await utils.getTextOfWebpage(url);
};

const runJSInActiveTab = async (script: string) => {
  // Cannot actually run JS in SigmaOS, so just execute JS on the HTML of the current tab.
  const url = await currentURL();
  const html = await utils.getURLHTML(url);
  return await utils.runJSAgainstHTML(script, html);
};

const SigmaOS: Browser = {
  name,
  version,
  bundleID,
  bundlePath,
  currentURL,
  tabs,
  currentTab,
  currentTabText,
  runJSInActiveTab,
};

export default SigmaOS;
