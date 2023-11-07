jest.mock("node-fetch", () => ({ fetch: console.log("mocked fetch") }));
jest.mock("@raycast/utils", () => ({
  runAppleScript: (script: string) => execScript(script, []).data,
}));

import { execScript } from "../lib/scripts";
import { DefaultPlaceholders } from "../lib/defaultPlaceholders";

describe("Placeholder List Tests", () => {
  it("should have extension-specific flow directives in default placeholders list", async () => {
    const mdPlaceholder = DefaultPlaceholders["TextfileMdPlaceholder"];
    expect(mdPlaceholder).toBeDefined();
  });
});
