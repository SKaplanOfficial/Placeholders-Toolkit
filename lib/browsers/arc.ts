import { runAppleScript } from "@raycast/utils";
import { Browser } from "./types";

const name = "Arc";

const version = async () => {
  return await runAppleScript(`tell application "Arc" to return version`);
};

const bundleID = async () => {
  return await runAppleScript(`tell application "Arc" to return id`);
};

const bundlePath = async () => {
  return await runAppleScript(
    `tell application "Arc" to return POSIX path of (path to it)`
  );
};

const currentURL = async () => {
  return await runAppleScript(`try
  tell application "Arc"
    return URL of active tab of window 1
  end tell
end try`);
};

const tabs = async (): Promise<{ name: string; url: string }[]> => {
  const data = await runAppleScript(`try
    set oldDelims to AppleScript's text item delimiters
    set AppleScript's text item delimiters to "\`\`\`"
    tell application "Arc"
      set theData to {title, URL} of (tabs of window 1 whose location is "unpinned")
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
    tell application "Arc"
      set theData to {title, url} of active tab of window 1
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
  return await runJSInActiveTab(`document.body.innerText`);
};

const runJSInActiveTab = async (script: string) => {
  return await runAppleScript(`tell application "Arc"
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

const Arc: Browser = {
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

export default Arc;
