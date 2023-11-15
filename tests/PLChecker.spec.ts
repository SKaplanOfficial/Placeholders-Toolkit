jest.mock("node-fetch", () => ({ fetch: console.log("mocked fetch") }));
jest.mock("@raycast/utils", () => ({
  runAppleScript: (script: string) => execScript(script, []).data,
}));

import { execScript } from "../lib/scripts";
import { PLChecker } from "../lib";

describe("Placeholder Checker Tests", () => {
  it("should detect 3 distinct placeholders", async () => {
    const str = "Hello, I am {{user}}. I am {{computerName}}. Today is {{day}}.";
    const placeholders = await PLChecker.checkForPlaceholders(str);
    expect(placeholders.length).toBe(3);
  });

  it("should detect 3 distinct placeholders not surrounded by double curly braces when not using strict mode", async () => {
    const str = "Hello, I am user. I am computerName. Today is day.";
    const placeholders = await PLChecker.checkForPlaceholders(str, {
      strict: false,
    });
    expect(placeholders.length).toBe(3);
  });

  it("should not detect incomplete placeholders when using strict mode", async () => {
    const str = "Hello, I am user. I am computerName. Today is day.";
    const placeholders = await PLChecker.checkForPlaceholders(str, {
      strict: true,
    });
    expect(placeholders.length).toBe(0);
  });

  it("should correctly identify the range of placeholders", async () => {
    const str = "Hello, I am {{user}}. I am {{computerName}}. Today is {{day}}.";
    const ranges = await PLChecker.getPlaceholderRanges(str);
    expect(ranges.length).toBe(3);
    expect(ranges[0].range.startIndex).toBe(54);
    expect(ranges[0].range.endIndex).toBe(61);
    expect(ranges[1].range.startIndex).toBe(27);
    expect(ranges[1].range.endIndex).toBe(43);
    expect(ranges[2].range.startIndex).toBe(12);
    expect(ranges[2].range.endIndex).toBe(20);
  });

  it("should correctly identify placeholders in a given range", async () => {
    const str = "Hello, I am {{user}}. I am {{computerName}}. Today is {{day}}.";
    const ranges = await PLChecker.getPlaceholderRanges(str);
    const placeholders = await PLChecker.checkForPlaceholdersInRange(
      str,
      ranges[0].range
    );
    expect(placeholders.length).toBe(1);
    expect(placeholders[0].name).toBe("day");

    const customRange = { startIndex: 26, endIndex: 45 };
    const morePlaceholders = await PLChecker.checkForPlaceholdersInRange(
      str,
      customRange
    );
    expect(morePlaceholders.length).toBe(1);
    expect(morePlaceholders[0].name).toBe("computerName");
  });
});