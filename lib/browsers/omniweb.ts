import { runAppleScript } from "@raycast/utils";
import { Browser } from "./types";

const name = "OmniWeb";

const version = async () => {
  return await runAppleScript(`tell application "OmniWeb" to return version`);
};

const bundleID = async () => {
  return await runAppleScript(`tell application "OmniWeb" to return id`);
};

const bundlePath = async () => {
  return await runAppleScript(
    `tell application "OmniWeb" to return POSIX path of (path to it)`
  );
};

const currentURL = async () => {
  return runAppleScript(
    `tell application "OmniWeb" to return address of active tab of browser 1`
  );
};

const tabs = async (): Promise<{ name: string; url: string }[]> => {
  const data = await runAppleScript(`try
    set oldDelims to AppleScript's text item delimiters
    set AppleScript's text item delimiters to "\`\`\`"
    tell application "OmniWeb"
      set theData to {title, address} of tabs of browser 1
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
    tell application "OmniWeb"
      set theData to {title, address} of active tab of browser 1
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
  return await runAppleScript(`tell application "OmniWeb"
    do script "try {
      ${script}
    } catch {
      '';
    }" window browser 1
  end tell`);
};

const OmniWeb: Browser = {
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

export default OmniWeb;
