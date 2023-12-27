import {
  loadPlaceholderFromJSONString,
  loadPlaceholdersFromJSONString,
} from "../lib/load";
import { newPlaceholder } from "../lib/new";
import { execScript } from "../lib/scripts";

jest.mock("node-fetch", () => ({ fetch: console.log("mocked fetch") }));
jest.mock("@raycast/utils", () => ({
  runAppleScript: (script: string) => execScript(script, []).data,
}));

import { PlaceholderCategory, PlaceholderType } from "../lib/types";

describe("Creating New Placeholders", () => {
  it("should not allow apply_fn and replace_with at the same time", async () => {
    expect(() =>
      newPlaceholder("test", {
        regex: undefined,
        apply_fn: async () => ({ result: "null" }),
        replace_with: "test",
      })
    ).toThrow("Cannot specify both apply_fn and replace_with");
  });

  it("should replace with nothing if neither apply_fn and replace_with are provided", async () => {
    expect(newPlaceholder("test").apply("{{test}}")).resolves.toEqual({
      result: "",
    });
  });

  it("should associate replace_with apply_fn when replace_with is provided", async () => {
    expect(
      newPlaceholder("test", {
        regex: undefined,
        apply_fn: undefined,
        replace_with: "my result",
      }).apply("{{test}}")
    ).resolves.toEqual({ result: "my result", test: "my result" });
  });
});

describe("Loading Placeholders", () => {
  it("should throw on invalid JSON string", async () => {
    const invalidJSONString = "this is not valid JSON";
    expect(() => loadPlaceholderFromJSONString(invalidJSONString)).toThrow(
      `Error loading placeholder from JSON string. Invalid JSON string: ${invalidJSONString}`
    );

    expect(() => loadPlaceholdersFromJSONString(invalidJSONString)).toThrow(
      `Error loading placeholders from JSON string. Invalid JSON string: ${invalidJSONString}`
    );
  });

  it("should throw on placeholder with no name", async () => {
    const invalidJSONString = JSON.stringify({ regex: "test" });
    expect(() => loadPlaceholderFromJSONString(invalidJSONString)).toThrow(
      `Error loading placeholder from JSON string. Placeholder is missing name field.`
    );
  });

  it("should throw on placeholder with no value", async () => {
    const invalidJSONString = JSON.stringify({ name: "test", regex: "test" });
    expect(() => loadPlaceholderFromJSONString(invalidJSONString)).toThrow(
      `Error loading placeholder from JSON string. Placeholder is missing value field.`
    );
  });

  it("should throw on placeholder with non-string name", async () => {
    const invalidJSONString = JSON.stringify({
      name: 1,
      regex: "test",
      value: "test",
    });
    expect(() => loadPlaceholderFromJSONString(invalidJSONString)).toThrow(
      `Error loading placeholder from JSON string. Placeholder name is not a string.`
    );
  });

  it("should throw on placeholder with non-string regex", async () => {
    const invalidJSONString = JSON.stringify({
      name: "test",
      regex: 1,
      value: "test",
    });
    expect(() => loadPlaceholderFromJSONString(invalidJSONString)).toThrow(
      `Error loading placeholder from JSON string. Placeholder regex is not a string.`
    );
  });

  it("should throw on placeholder with non-string value", async () => {
    const invalidJSONString = JSON.stringify({
      name: "test",
      regex: "test",
      value: 1,
    });
    expect(() => loadPlaceholderFromJSONString(invalidJSONString)).toThrow(
      `Error loading placeholder from JSON string. Placeholder value is not a string.`
    );
  });

  it("should not throw on placeholder with string name, regex, and value", async () => {
    const validJSONString = JSON.stringify({
      name: "test",
      regex: "test",
      value: "test",
    });
    expect(() => loadPlaceholderFromJSONString(validJSONString)).not.toThrow();
  });

  it("should properly assign fields", async () => {
    const validJSONString = JSON.stringify({
      name: "test",
      regex: "test",
      value: "my value",
      description: "test",
      example: "test",
      hintRepresentation: "test",
      fullRepresentation: "test",
      type: 0,
      categories: [1, 2, 3],
    });

    const placeholder = loadPlaceholderFromJSONString(validJSONString);

    expect(placeholder).not.toBeUndefined();
    expect(placeholder?.name).toBe("test");
    expect(placeholder?.regex).toEqual(new RegExp("test"));
    expect(placeholder?.description).toBe("test");
    expect(placeholder?.example).toBe("test");
    expect(placeholder?.hintRepresentation).toBe("test");
    expect(placeholder?.fullRepresentation).toBe("test (Custom)");
    expect(placeholder?.type).toBe(PlaceholderType.Informational);
    expect(placeholder?.categories).toEqual([
      PlaceholderCategory.Calendar,
      PlaceholderCategory.Weather,
      PlaceholderCategory.Location,
    ]);

    expect(placeholder?.apply("{{test}}")).resolves.toEqual({
      result: "my value",
      test: "my value",
    });
  });
});
