"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
/**
 * Directive to ignore all content within the directive. Allows placeholders and directives to run without influencing the output.
 */
const IgnoreDirective = {
    name: "ignore",
    regex: /{{(ignore|IGNORE):[^}]*?}}/g,
    apply: async () => {
        return { result: "" };
    },
    constant: false,
    fn: async (content) => (await IgnoreDirective.apply(`{{ignore:${content}}}`)).result,
    example: '{{ignore:{{jxa:Application("Safari").activate()}}}}',
    description: "Directive to ignore all content within the directive. Allows placeholders and directives to run without influencing the output.",
    hintRepresentation: "{{ignore:...}}",
    fullRepresentation: "Ignore",
    type: types_1.PlaceholderType.StaticDirective,
    categories: [types_1.PlaceholderCategory.Meta],
};
exports.default = IgnoreDirective;
