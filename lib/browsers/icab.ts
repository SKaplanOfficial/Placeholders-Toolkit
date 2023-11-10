import { runAppleScript } from "@raycast/utils";
import { Browser } from "./types";
import { utils } from ".";

const name = "iCab";

const version = async () => {
  return await runAppleScript(`tell application "iCab" to return version`);
};

const bundleID = async () => {
  return await runAppleScript(`tell application "iCab" to return id`);
};

const bundlePath = async () => {
  return await runAppleScript(
    `tell application "iCab" to return POSIX path of (path to it)`
  );
};

const currentURL = async () => {
  return runAppleScript(`try
    tell application "iCab"
        return url of document 1
    end tell
  end try`);
};

const tabs = async (): Promise<{ name: string; url: string }[]> => {
  const data = await runAppleScript(`try
    set oldDelims to AppleScript's text item delimiters
    set AppleScript's text item delimiters to "\`\`\`"
    tell application "iCab"
      set theData to {name, url} of tabs of window 1
      set theData to theData as string
      set AppleScript's text item delimiters to oldDelims
      return theData
    end tell
  end try`);
  const entries = data.split("```");
  const names = entries.slice(0, entries.length / 2);
  const urls = entries.slice(entries.length / 2);
  return names.map((name, i) => ({ name: name, url: urls[i] }));
};

const currentTab = async (): Promise<{ name: string; url: string }> => {
  const data = await runAppleScript(`try
    set oldDelims to AppleScript's text item delimiters
    set AppleScript's text item delimiters to "\`\`\`"
    tell application "iCab"
      set theData to {name, url} of current tab of window 1
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
  // Cannot actually run JS in iCab, so just execute JS on the HTML of the current tab.
  const url = await currentURL();
  const html = await utils.getURLHTML(url);
  return await utils.runJSAgainstHTML(script, html);
};

const iCab: Browser = {
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

export default iCab;
