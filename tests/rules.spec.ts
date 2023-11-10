import { PLApplicator } from "../lib";

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
      `tell application "System Events" to return name of first application process whose frontmost is true`,
      []
    ).data;
    return { name: result };
  },
}));

import { execScript } from "../lib/scripts";
import ClipboardTextPlaceholder from "../lib/info-placeholders/clipboardText";
import SelectedFilesPlaceholder from "../lib/info-placeholders/selectedFiles";
import CurrentDirectoryPlaceholder from "../lib/info-placeholders/currentDirectory";
import CurrentTabTextPlaceholder from "../lib/info-placeholders/currentTabText";
import { RequireContainedIn, RequireContains } from "../lib/rules";

describe("RequireValue Tests", () => {
  it("should be false when the clipboard is empty", async () => {
    await execScript(`set the clipboard to ""`, []).data;
    const result = await ClipboardTextPlaceholder.rules?.[0](
      "{{clipboardText}}"
    );
    expect(result).toBe(false);
  });

  it("should be true when the clipboard is not empty", async () => {
    await execScript(`set the clipboard to "test"`, []).data;
    const result = await ClipboardTextPlaceholder.rules?.[0](
      "{{clipboardText}}"
    );
    expect(result).toBe(true);
  });

  it("should be false when no files are selected, true otherwise", async () => {
    await execScript(
      `tell application "Finder" to set collapsed of every window to true
      delay 1`,
      []
    ).data;
    
    let result = await SelectedFilesPlaceholder.rules?.[0]("{{selectedFiles}}");
    expect(result).toBe(false);

    await execScript(
      `tell application "Finder"
      activate
      select {my POSIX file "/Library" as alias, my POSIX file "/Users" as alias}
      delay 1
    end tell`,
      []
    ).data;
    result = await SelectedFilesPlaceholder.rules?.[0]("{{selectedFiles}}");
    expect(result).toBe(true);
  });
});

// describe("RequireEquals Tests", () => {
//   it("should be false when Finder is not active", async () => {
//     await execScript(`tell application "Terminal" to activate`, []).data;
//     const result = await CurrentDirectoryPlaceholder.rules?.[0](
//       "{{currentDirectory}}"
//     );
//     expect(result).toBe(false);
//   });

//   it("should be true when Finder is active", async () => {
//     await execScript(
//       `tell application "Finder" to activate
//     delay 0.5`,
//       []
//     ).data;
//     const result = await CurrentDirectoryPlaceholder.rules?.[0](
//       "{{currentDirectory}}"
//     );
//     expect(result).toBe(true);
//   });
// });

// describe("RequireContains Tests", () => {
//   it("should be false when value is not in list", async () => {
//     const result = await RequireContains(
//       ["test", "test2"],
//       "test3"
//     )("{{currentTabText}}");
//     expect(result).toBe(false);
//   });

//   it("should be true when value is in list", async () => {
//     const result = await RequireContains(
//       () => ["test", "test2"],
//       "test"
//     )("{{currentTabText}}");
//     expect(result).toBe(true);
//   });
// });

// describe("RequireContainedIn Tests", () => {
//   it("should be false when value is not in list", async () => {
//     const result = await RequireContainedIn("test3", ["test", "test2"])(
//       "{{currentTabText}}"
//     );
//     expect(result).toBe(false);
//   });

//   it("should be true when value is in list", async () => {
//     const result = await RequireContainedIn("test", () => ["test", "test2"])(
//       "{{currentTabText}}"
//     );
//     expect(result).toBe(true);
//   });
// });

// describe("RequireActiveBrowser Tests", () => {
//   it("should be false when not browser is active", async () => {
//     await execScript(`tell application "Terminal" to activate`, []).data;
//     const result = await CurrentTabTextPlaceholder.rules?.[0](
//       "{{currentTabText}}"
//     );
//     expect(result).toBe(false);
//   });

//   it("should be true when Finder is active", async () => {
//     await execScript(
//       `tell application "Safari" to activate
//     delay 0.5`,
//       []
//     ).data;
//     const result = await CurrentTabTextPlaceholder.rules?.[0](
//       "{{currentTabText}}"
//     );
//     expect(result).toBe(true);
//   });
// });
