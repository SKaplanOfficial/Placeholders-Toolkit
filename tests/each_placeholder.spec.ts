import { bulkApply } from "../lib/apply";

jest.mock("node-fetch", () => ({ fetch: console.log("mocked fetch") }));
jest.mock("@raycast/utils", () => ({
  runAppleScript: (script: string) => execScript(script, []).data,
}));
jest.mock("@raycast/api", () => ({
  Clipboard: {
    readText: () => execScript("return the clipboard", []).data,
  },
  getFrontmostApplication: async () => {
    const result = await execScript(
      `use framework "AppKit"
      tell application "System Events"
      set frontApp to first application process whose frontmost is true
      set theData to {|name|:name of frontApp, bundleId:bundle identifier of frontApp, |path|:POSIX path of application file of frontApp}

      set jsonObj to current application's NSJSONSerialization's dataWithJSONObject:theData options:(current application's NSJSONWritingFragmentsAllowed) |error|:(missing value)
      set jsonString to current application's NSString's alloc()'s initWithData:jsonObj encoding:(current application's NSUTF8StringEncoding)
      return jsonString as text
    end tell`,
      []
    ).data;
    return JSON.parse(result) as {
      name: string;
      bundleId: string;
      path: string;
    };
  },
  getSelectedText: async () => {
    const result = await execScript(
      `tell application "System Events"
        set currentClipboardContent to the clipboard
        keystroke "c" using {command down}
        delay 0.1

        set theSelection to the clipboard
        set the clipboard to currentClipboardContent
        return theSelection
    end tell`,
      []
    ).data;
    return result;
  },
}));

import os from "os";
import { execScript } from "../lib/scripts";
import path from "path";

describe("Information Placeholder Tests", () => {
  it("should replace {{clipboardText}} with correct clipboard text", async () => {
    await (execScript(
      `set the clipboard to "test"
    delay 0.5`,
      []
    ).data);
    await (new Promise((resolve) => setTimeout(resolve, 1000)));
    expect(await bulkApply("{{clipboardText}}")).toBe("test");
  });

  it("should replace {{computerName}} with the correct computer name", async () => {
    const computerName = await execScript(
      `return computer name of ((system info) as record)`,
      []
    ).data;
    expect(await bulkApply("{{computerName}}")).toBe(computerName);
  });

  it("should replace {{currentAppBundleID}} with the correct bundle ID", async () => {
    const bundleID = "com.apple.Terminal";
    expect(await bulkApply("{{currentAppBundleID}}")).toBe(bundleID);
  });

  it("should replace {{currentAppName}} with the correct name", async () => {
    expect(await bulkApply("{{currentAppName}}")).toBe("Terminal");
  });

  it("should replace {{currentAppPath}} with the correct path to Finder", async () => {
    const terminalPath = "/System/Applications/Utilities/Terminal.app";
    expect(await bulkApply("{{currentAppPath}}")).toBe(terminalPath);
  });

  it("should replace {{currentDirectory}} with the correct directory", async () => {
    const libraryDirectory = path.join(os.homedir(), "Library/");
    const fontDirectory = path.join(libraryDirectory, "Fonts/");
    await bulkApply(`{{selectFile:${fontDirectory}}}`);
    await (new Promise((resolve) => setTimeout(resolve, 1000)));
    expect(await bulkApply("{{currentDirectory}}")).toBe(libraryDirectory);
  });

  // it("should replace {{currentTabText}} with the correct text", async () => {
  // console.log(await bulkApply("{{date}}"));
  // console.log(await bulkApply("{{time}}"));
  // console.log(await bulkApply("{{day}}"));
  // console.log(await bulkApply("{{homedir}}"));
  // console.log(await bulkApply("{{hostname}}"));
  // console.log(await bulkApply("{{user}}"));
  // console.log(await bulkApply("{{installedApps}}"));
  // console.log(await bulkApply("{{lastNote}}"));
  // console.log(await bulkApply("{{lastEmail}}"));
  // console.log(await bulkApply("{{runningApplications}}"));
  // console.log(await bulkApply("{{musicTracks}}"));
  // console.log(await bulkApply("{{location}}"));
  // console.log(await bulkApply("{{timezone}}"));
  // console.log(await bulkApply("{{safariTopSites}}"));
  // console.log(await bulkApply("{{safariBookmarks}}"));
  // console.log(await bulkApply("{{shortcuts}}"));
  // console.log(await bulkApply("{{todayWeather}}"));
  // console.log(await bulkApply("{{weekWeather}}"));
  // console.log(await bulkApply("{{systemLanguage}}"));
  // console.log(await bulkApply("{{selectedFiles}}"));
  // console.log(await bulkApply("{{fileNames}}"));
  // console.log(await bulkApply("{{selectedFileContents}}"));
  // console.log(await bulkApply("{{selectedText}}"));
  // console.log(await bulkApply("{{monthEvents}}"));
  // console.log(await bulkApply("{{monthReminders}}"));
  // });

  it("should replace {{user}} with correct user name", async () => {
    const user = os.userInfo().username;
    expect(await bulkApply("I am {{user}}.")).toBe(`I am ${user}.`);
  });

  it("should replace {{time}} with correct time", async () => {
    expect(await bulkApply("The time is {{time}}")).toMatch(
      /The time is [0-9]{1,2}:[0-9]{1,2}:[0-9]{1,2} (AM|PM)/g
    );
  });
});

describe("Script Placeholder Tests", () => {
  it("should correct evaluate and substitute AppleScript placeholders", async () => {
    expect(await bulkApply("{{as:return 5}}")).toBe("5");
  });

  it("should correctly evaluate and substitute JXA placeholders", async () => {
    expect(await bulkApply("{{jxa:5}}")).toBe("5");
  });

  it("should correctly evaluate and substitute shell placeholders", async () => {
    expect(await bulkApply("{{shell:echo 5}}")).toBe("5");
  });

  it("should correctly evaluate and substitute JavaScript placeholders", async () => {
    expect(await bulkApply("{{js:(() => {return 5})()}}")).toBe("5");
  });
});
