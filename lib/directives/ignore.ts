import { Placeholder, PlaceholderCategory, PlaceholderType } from "../types";

/**
 * Directive to ignore all content within the directive. Allows placeholders and directives to run without influencing the output.
 * 
 * Syntax: `{{ignore:...}}`, where `...` is the content to ignore.
 */
const IgnoreDirective: Placeholder = {
  name: "ignore",
  regex: /{{(ignore|IGNORE):[^}]*?}}/g,
  apply: async () => {
    return { result: "" };
  },
  constant: false,
  fn: async (content: unknown) => {
    if (typeof content === "function") {
      return (
        await IgnoreDirective.apply(
          `{{ignore:${await Promise.resolve(content())}}}`
        )
      ).result;
    }
    return (await IgnoreDirective.apply(`{{ignore:${content}}}`)).result
  },
  example: '{{ignore:{{jxa:Application("Safari").activate()}}}}',
  description:
    "Directive to ignore all content within the directive. Allows placeholders and directives to run without influencing the output.",
  hintRepresentation: "{{ignore:...}}",
  fullRepresentation: "Ignore",
  type: PlaceholderType.StaticDirective,
  categories: [PlaceholderCategory.Meta],
};

export default IgnoreDirective;
