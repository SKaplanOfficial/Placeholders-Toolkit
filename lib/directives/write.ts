import { Toast, open, showToast } from "@raycast/api";
import { Placeholder, PlaceholderCategory, PlaceholderType } from "../types";
import * as fs from "fs";
import os from "os";
import path from "path";

/**
 * Directive to write the provided text to a file. The placeholder will always be replaced with an empty string.
 * 
 * Syntax: `{{write to="[path]" append=(true|false) end="[token]" :...}}`, where `...` is the text to write, `[path]` is the path to the file to write to, and `[token]` is a token to append to the end of the file (defaults to `\n\n`). If `append` is `true`, the text will be appended to the end of the file instead of overwriting it.
 * 
 * The `append` and `end` settings are optional. If no `end` token is provided, the default token is `\n\n`. The default `append` setting is `false`. You must provide a path and text.
 */
export const WriteFileDirective: Placeholder = {
  name: "write",
  regex: /{{write to="([\s\S]+?)"( append=(true|false))?( end="([\s\S]+?)")?:([\s\S]+?)}}/g,
  apply: async (str: string) => {
    const matches = str.match(
      /{{write to="([\s\S]+?)"( append=(true|false))?( end="([\s\S]+?)")?:([\s\S]+?)}}/
    );
    let filepath = matches?.[1];
    const append = matches?.[3] === "true";
    const end = matches?.[5] ?? "\n\n";
    const text = matches?.[6];
    if (!filepath || !text) return { result: "" };

    if (filepath?.startsWith("~")) {
      filepath = filepath.replace("~", os.homedir());
    }

    let file = filepath;
    if (fs.existsSync(filepath)) {
      if (fs.lstatSync(filepath).isDirectory()) {
        file = path.join(filepath, "pins.txt");

        let i = 2;
        while (fs.existsSync(file)) {
          file = path.join(filepath, `pins-${i}.txt`);
          i++;
        }
      } else if (!append) {
        const dir = path.dirname(filepath);
        const ext = path.extname(filepath);
        let i = 1;
        while (fs.existsSync(file)) {
          file = path.join(dir, `${path.basename(filepath, ext)}-${i}${ext}`);
          i++;
        }
      }
    }

    const filename = path.basename(file);
    const action: Toast.ActionOptions = {
      title: `Open ${filename}`,
      onAction: () => open(file),
    };
    if (append) {
      await fs.promises.appendFile(file, text + end);
      await showToast({
        title: `Appended To ${filename}`,
        primaryAction: action,
      });
    } else {
      await fs.promises.writeFile(file, text + end);
      await showToast({ title: `Wrote To ${filename}`, primaryAction: action });
    }
    return { result: "" };
  },
  constant: false,
  fn: async (path: unknown, content: unknown, append = "false", end = "\n\n") => {
    const pathText =
      typeof path === "function" ? await Promise.resolve(path()) : path;
    const contentText =
      typeof content === "function"
        ? await Promise.resolve(content())
        : content;
    return (
      await WriteFileDirective.apply(
        `{{write to="${pathText}" append=${
          append.toString() == "true" ? "true" : "false"
        } end="${end}":${contentText}}}`
      )
    ).result;
  },
  example: '{{write to="~/Downloads/test.txt":Hello World}}',
  description:
    "Directive to write the provided text to a file. The placeholder will always be replaced with an empty string.",
  hintRepresentation: "{{write:...}}",
  fullRepresentation: "Write To File",
  type: PlaceholderType.InteractiveDirective,
  categories: [PlaceholderCategory.Files],
};

export default WriteFileDirective;
