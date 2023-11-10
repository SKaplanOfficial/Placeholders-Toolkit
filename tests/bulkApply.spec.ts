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
      `tell application "System Events" to return name of first application process whose frontmost is true`,
      []
    ).data;
    return { name: result };
  },
}));

import os from "os";
import { execScript } from "../lib/scripts";

describe("Bulk Apply Tests", () => {
  it("should replace all occurrences of a given placeholder in a string", async () => {
    const stringToReplace =
      "Hello, I am {{user}}. I am {{user}}. I am {{user}}.";
    const user = os.userInfo().username;
    expect(await bulkApply(stringToReplace)).toBe(
      `Hello, I am ${user}. I am ${user}. I am ${user}.`
    );
  });

  it("should replace all occurrences of multiple placeholders in a string", async () => {
    const stringToReplace =
      "Hello, I am {{user}}. My timezone is {{timezone}}. Today is {{day}}.";
    const user = os.userInfo().username;
    const timezone =
      Intl.DateTimeFormat(undefined, { timeZoneName: "long" })
        .formatToParts(new Date())
        .filter((s) => s.type == "timeZoneName")?.[0]?.value ||
      Intl.DateTimeFormat().resolvedOptions().timeZone;
    const day = new Date().toLocaleDateString("en-US", { weekday: "long" });
    expect(await bulkApply(stringToReplace)).toBe(
      `Hello, I am ${user}. My timezone is ${timezone}. Today is ${day}.`
    );
  });
});
