import { textFileExtensions } from "../../data/file-extensions";
import { Placeholder, PlaceholderCategory, PlaceholderType } from "../../types";

/**
 * Flow control directives for each text file extension.
 * 
 * Each text file directive follows the same syntax: `{{ext:content if true}}` or `{{ext:[content if true]:[content if false]}}`, where `ext` is the text file extension, e.g. `txt`, `md`, `js`, etc.
 * 
 * The content if false is optional.
 */
export const TextFileDirectives = textFileExtensions
  .map((ext) => {
    if (["js", "as"].includes(ext)) {
      return `${ext}files`;
    }
    return ext;
  })
  .map((ext) => {
    const newPlaceholder: Placeholder = {
      name: `textfile:${ext}`,
      regex: new RegExp(
        `{{${ext.replaceAll(
          /[/\\+#!-]/g,
          "\\$1"
        )}:(([^{]|{(?!{)|{{[\\s\\S]*?}})*?)(:(([^{]|{(?!{)|{{[\\s\\S]*?}})*?))?}}`
      ),
      apply: async (str: string, context?: { [key: string]: unknown }) => {
        if (!context) return { result: "", [`textfile:${ext}`]: "" };
        if (!context["selectedFiles"])
          return { result: "", [`image:${ext}`]: "" };

        const onSuccess =
          str.match(
            new RegExp(
              `{{${ext.replaceAll(
                /\+#!-/g,
                "\\$1"
              )}:(([^{]|{(?!{)|{{[\\s\\S]*?}})*?)(:(([^{]|{(?!{)|{{[\\s\\S]*?}})*?))?}}`
            )
          )?.[1] || "";
        const onFailure =
          str.match(
            new RegExp(
              `{{${ext.replaceAll(
                /\+#!-/g,
                "\\$1"
              )}:(([^{]|{(?!{)|{{[\\s\\S]*?}})*?)(:(([^{]|{(?!{)|{{[\\s\\S]*?}})*?))?}}`
            )
          )?.[4] || "";

        const files = (context["selectedFiles"] as string).split(",");
        const containsTextFile = files.some((file) =>
          file.toLowerCase().endsWith(ext)
        );
        if (!containsTextFile)
          return { result: onFailure, [`textfile:${ext}`]: onFailure };
        return { result: onSuccess, [`textfile:${ext}`]: onSuccess };
      },
      result_keys: [`textfile:${ext}`],
      constant: true,
      fn: async (content: unknown) => {
        if (typeof content === "function") {
          return (
            await newPlaceholder.apply(
              `{{${ext}:${await Promise.resolve(content())}}}`
            )
          ).result;
        }
        return (await newPlaceholder.apply(`{{${ext}:${content}}}`)).result;
      },
      example: `{{${ext}:This one if any ${ext} file is selected:This one if no ${ext} file is selected}}`,
      description: `Flow control directive to include some content if any ${ext} file is selected and some other content if no ${ext} file is selected.`,
      hintRepresentation: `{{${ext}:...:...}}`,
      fullRepresentation: `${ext.toUpperCase()} Condition`,
      type: PlaceholderType.InteractiveDirective,
      categories: [PlaceholderCategory.Logic, PlaceholderCategory.Meta],
    };
    return newPlaceholder;
  });

/**
 * Directive for directions that will only be included in the prompt if any image files are selected.
 * 
 * Syntax: `{{textfiles:content if true}}` or `{{textfiles:[content if true]:[content if false]}}`
 * 
 * The content if false is optional.
 */
const TextFileFlowDirective: Placeholder = {
  name: "contentForTextFiles",
  regex:
    /{{textfiles:(([^{]|{(?!{)|{{[\s\S]*?}})*?)(:(([^{]|{(?!{)|{{[\s\S]*?}})*?))?}}/g,
  apply: async (str: string, context?: { [key: string]: unknown }) => {
    if (!context) return { result: "", contentForTextFiles: "" };
    if (!context["selectedFiles"])
      return { result: "", contentForTextFiles: "" };

    const onSuccess =
      str.match(
        /{{textfiles:(([^{]|{(?!{)|{{[\s\S]*?}})*?)(:(([^{]|{(?!{)|{{[\s\S]*?}})*?))?}}/
      )?.[1] || "";
    const onFailure =
      str.match(
        /{{textfiles:(([^{]|{(?!{)|{{[\s\S]*?}})*?)(:(([^{]|{(?!{)|{{[\s\S]*?}})*?))?}}/
      )?.[4] || "";

    const files = (context["selectedFiles"] as string).split(",");
    const contentForTextFiles = files.some((file) =>
      textFileExtensions.some((ext) => file.toLowerCase().endsWith(ext))
    );
    if (!contentForTextFiles)
      return { result: onFailure, contentForTextFiles: onFailure };
    return { result: onSuccess, contentForTextFiles: onSuccess };
  },
  result_keys: ["contentForTextFiles"],
  constant: true,
  fn: async (onSuccess: unknown, onFailure?: unknown) => {
    const contentOnSuccess =
      typeof onSuccess === "function"
        ? await Promise.resolve(onSuccess())
        : onSuccess;
    const contentOnFailure =
      typeof onFailure === "function"
        ? await Promise.resolve(onFailure())
        : onFailure;
    return (
      await TextFileFlowDirective.apply(
        `{{textfiles:${contentOnSuccess}${onFailure ? contentOnFailure : ""}}}`
      )
    ).result;
  },
  example:
    "{{textfiles:This one if any text file is selected:This one if no text file is selected}}",
  description:
    "Flow control directive to include some content if any text file is selected and some other content if no text file is selected.",
  hintRepresentation: "{{textfiles:...:...}}",
  fullRepresentation: "Text File Condition",
  type: PlaceholderType.InteractiveDirective,
  categories: [PlaceholderCategory.Logic, PlaceholderCategory.Meta],
};

export default TextFileFlowDirective;
