import { bulkApply } from "../lib/apply";

jest.mock("node-fetch", () => ({ fetch: console.log("mocked fetch") }));
jest.mock("@raycast/utils", () => ({
  runAppleScript: (script: string) => execScript(script, []).data,
}));

import os from "os";
import { execScript } from "../lib/scripts";
import { DefaultPlaceholders } from "../lib/defaultPlaceholders";

describe("Information Placeholder Tests", () => {
  it("should replace {{user}} with correct user name", async () => {
    const user = os.userInfo().username;
    expect(await bulkApply("I am {{user}}.")).toBe(`I am ${user}.`);
  });

  it("should replace {{time}} with correct time", async () => {
    const time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "numeric",
    });
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
