import { loadPlaceholdersFromJSONString } from "../lib/load";
import { newPlaceholder } from "../lib/new";
import { bulkApply } from "../lib/apply";

jest.mock("node-fetch", () => ({ fetch: console.log("mocked fetch") }));
jest.mock("@raycast/utils", () => ({ runAppleScript: (script: string) => execScript(script, []).data }));

import os from "os";
import { execScript } from "../lib/scripts";

describe("Bulk Apply With Custom Placeholders Tests", () => {
  it("should successfully apply custom placeholder with replace_with specified", async () => {
    const customPlaceholder = newPlaceholder("test", undefined, undefined, "my result");
    expect(await bulkApply("{{test}}", undefined, [customPlaceholder])).toBe("my result");
  });

  it("should successfully apply custom placeholder with apply_fn specified", async () => {
    const customPlaceholder = newPlaceholder("test", undefined, async (str, context) => ({ result: "my result" }));
    expect(await bulkApply("{{test}}", undefined, [customPlaceholder])).toBe("my result");
  });

  it("should successfully apply basic custom placeholders specified in JSON", async () => {
    const validJSON = JSON.stringify({
      "{{test}}": {
        name: "test",
        regex: "test",
        value: "my result",
      },
      "{{test2}}": {
        name: "test2",
        regex: "test2",
        value: "my result2",
      }
    });

    const customPlaceholders = loadPlaceholdersFromJSONString(validJSON);
    expect(await bulkApply("{{test}} {{test2}}", undefined, customPlaceholders)).toBe("my result my result2");
  });

  it("should successfully apply custom JSON placeholders that utilize other placeholders", async () => {
    const validJSON = JSON.stringify({
      "{{test}}": {
        name: "test",
        regex: "test",
        value: "hello, my name is {{user}}",
      },
    });

    const customPlaceholders = loadPlaceholdersFromJSONString(validJSON);
    expect(await bulkApply("{{test}}", undefined, customPlaceholders)).toBe(`hello, my name is ${os.userInfo().username}`);
  });
});
