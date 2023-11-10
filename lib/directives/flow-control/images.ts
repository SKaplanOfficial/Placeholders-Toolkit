import { imageFileExtensions } from "../../data/file-extensions";
import { Placeholder, PlaceholderCategory, PlaceholderType } from "../../types";

/**
 * Flow control directives for each image file extension.
 * 
 * Each image directive follows the same syntax: `{{ext:content if true}}` or `{{ext:[content if true]:[content if false]}}`, where `ext` is the image file extension, e.g. `png`, `jpg`, `gif`, etc.
 * 
 * The content if false is optional.
 */
export const ImageDirectives = imageFileExtensions.map((ext) => {
  const newPlaceholder: Placeholder = {
    name: `image:${ext}`,
    regex: new RegExp(
      `{{${ext}:(([^{]|{(?!{)|{{[\\s\\S]*?}})*?)(:(([^{]|{(?!{)|{{[\\s\\S]*?}})*?))?}}`,
      "g"
    ),
    apply: async (str: string, context?: { [key: string]: unknown }) => {
      if (!context) return { result: "", [`image:${ext}`]: "" };
      if (!context["selectedFiles"])
        return { result: "", [`image:${ext}`]: "" };

      const onSuccess =
        str.match(
          new RegExp(
            `{{${ext}:(([^{]|{(?!{)|{{[\\s\\S]*?}})*?)(:(([^{]|{(?!{)|{{[\\s\\S]*?}})*?))?}}`
          )
        )?.[1] || "";
      const onFailure =
        str.match(
          new RegExp(
            `{{${ext}:(([^{]|{(?!{)|{{[\\s\\S]*?}})*?)(:(([^{]|{(?!{)|{{[\\s\\S]*?}})*?))?}}`
          )
        )?.[4] || "";

      const files = (context["selectedFiles"] as string).split(",");
      const containsImage = files.some((file) =>
        file.toLowerCase().endsWith(ext)
      );
      if (!containsImage)
        return { result: onFailure, [`image:${ext}`]: onFailure };
      return { result: onSuccess, [`image:${ext}`]: onSuccess };
    },
    result_keys: [`image:${ext}`],
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
 * Syntax: `{{images:content if true}}` or `{{images:[content if true]:[content if false]}}`
 * 
 * The content if false is optional.
 */
const ImageFlowDirective: Placeholder = {
  name: "contentForImages",
  regex:
    /{{images:(([^{]|{(?!{)|{{[\s\S]*?}})*?)(:(([^{]|{(?!{)|{{[\s\S]*?}})*?))?}}/g,
  apply: async (str: string, context?: { [key: string]: unknown }) => {
    if (!context) return { result: "", contentForImages: "" };
    if (!context["selectedFiles"]) return { result: "", contentForImages: "" };

    const onSuccess =
      str.match(
        /{{images:(([^{]|{(?!{)|{{[\s\S]*?}})*?)(:(([^{]|{(?!{)|{{[\s\S]*?}})*?))?}}/
      )?.[1] || "";
    const onFailure =
      str.match(
        /{{images:(([^{]|{(?!{)|{{[\s\S]*?}})*?)(:(([^{]|{(?!{)|{{[\s\S]*?}})*?))?}}/
      )?.[4] || "";

    const files = (context["selectedFiles"] as string).split(",");
    const contentForImages = files.some((file) =>
      imageFileExtensions.some((ext) => file.toLowerCase().endsWith(ext))
    );
    if (!contentForImages)
      return { result: onFailure, contentForImages: onFailure };
    return { result: onSuccess, contentForImages: onSuccess };
  },
  result_keys: ["contentForImages"],
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
      await ImageFlowDirective.apply(
        `{{images:${contentOnSuccess}${onFailure ? contentOnFailure : ""}}}`
      )
    ).result;
  },
  example:
    "{{images:This one if any image file is selected:This one if no image file is selected}}",
  description:
    "Flow control directive to include some content if any image file is selected and some other content if no image file is selected.",
  hintRepresentation: "{{images:...:...}}",
  fullRepresentation: "Image File Condition",
  type: PlaceholderType.InteractiveDirective,
  categories: [PlaceholderCategory.Logic, PlaceholderCategory.Meta],
};

export default ImageFlowDirective;
