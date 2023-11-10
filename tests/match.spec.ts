import {
  Bool,
  Braced,
  Container,
  EmailAddress,
  HTTPURL,
  Integer,
  List,
  RawParameter,
} from "../lib/match";

jest.mock("node-fetch", () => ({ fetch: console.log("mocked fetch") }));
jest.mock("@raycast/utils", () => ({
  runAppleScript: (script: string) => execScript(script, []).data,
}));

import { execScript } from "../lib/scripts";

describe("Regex Match Tests", () => {
  it("should match emails using construction and container approaches", async () => {
    const m1 = Braced(`email:${EmailAddress().source}`); // Construction approach
    const m2 = Container("email", [], EmailAddress()); // Container approach
    const target = "{{email:johhny.appleseed@gmail.com}}";
    expect(target.match(m1)).toEqual(target.match(m2));
  });

  it("should match HTTP URLs using construction and container approaches", async () => {
    const m1 = Braced(`url:${HTTPURL().source}`);
    const m2 = Container("url", [], HTTPURL());
    const target = "{{url:https://www.google.com}}";
    expect(target.match(m1)).toEqual(target.match(m2));
  });

  it("should format parameters correctly", async () => {
    const m1 = Braced(`url raw=(true|false):(${HTTPURL().source})`, {
      global: false,
    });
    const m2 = Container("url", [RawParameter("raw", Bool())], HTTPURL(), {
      global: false,
    });
    const target = "{{url raw=true:https://www.google.com}}";
    expect(target.match(m1)?.[3]).toEqual(target.match(m2)?.[4]);
  });

  it("should match HTTP URLs correctly with multiple approaches", async () => {
    const m1 = /{{url( raw=(true|false))?:https?:\/\/[a-zA-Z0-9.\-#=?]+?}}/g;
    const m2 = new RegExp(
      `{{url( raw=(true|false))?:https?:\\/\\/[a-zA-Z0-9.\\-#=?]+?}}`,
      "g"
    );
    const m3 = Braced(`url( raw=(true|false))?:(${HTTPURL().source})`);
    const m4 = Container(
      "url",
      [RawParameter("raw", Bool(), { optional: true })],
      HTTPURL()
    );

    const target = "{{url raw=false:https://www.google.com}}";
    expect(target.match(m1)).toEqual(target.match(m2));
    expect(target.match(m1)).toEqual(target.match(m3));
    expect(target.match(m1)).toEqual(target.match(m4));
  });

  it("should match lists correctly", async () => {
    const m1 = List(Bool());
    const m2 = List(Integer());
    const m3 = List(HTTPURL());
    const m4 = List(`(${Integer().source}|${Bool().source})`);
    const m5 = List("([a-zA-Z]+)(?!.*:.*}})", { separator: "\\." });

    const t1 = "{{list:true,false,true}}";
    const t2 = "{{list:1,2,3}}";
    const t3 = "{{list:https://www.google.com,https://www.apple.com}}";
    const t4 = "{{list:1,true,2,false,3,true}}";
    const t5 = "{{list:hello.world.foo.bar}}";

    expect(t1.match(m1)).toEqual(["true", "false", "true"]);
    expect(t2.match(m2)).toEqual(["1", "2", "3"]);
    expect(t3.match(m3)).toEqual([
      "https://www.google.com",
      "https://www.apple.com",
    ]);
    expect(t4.match(m4)).toEqual(["1", "true", "2", "false", "3", "true"]);
    expect(t5.match(m5)).toEqual(["hello", "world", "foo", "bar"]);
  });

  it("should match mixed lists correctly", async () => {
    const m1 = List([Bool(), Integer(), HTTPURL()]);
    const t1 = "{{list:1,https://www.google.com,true}}";
    expect(t1.match(m1)).toEqual(["1", "https://www.google.com", "true"]);
  });
});
