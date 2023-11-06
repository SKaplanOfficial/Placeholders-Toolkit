"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextFileDirectives = void 0;
const file_extensions_1 = require("../../data/file-extensions");
const types_1 = require("../../types");
exports.TextFileDirectives = file_extensions_1.textFileExtensions
    .map((ext) => {
    if (["js", "as"].includes(ext)) {
        return `${ext}files`;
    }
    return ext;
})
    .map((ext) => {
    const newPlaceholder = {
        name: `textfile:${ext}`,
        regex: new RegExp(`{{${ext.replaceAll(/[/\\+#!-]/g, "\\$1")}:(([^{]|{(?!{)|{{[\\s\\S]*?}})*?)(:(([^{]|{(?!{)|{{[\\s\\S]*?}})*?))?}}`),
        apply: async (str, context) => {
            if (!context)
                return { result: "", [`textfile:${ext}`]: "" };
            if (!context["selectedFiles"])
                return { result: "", [`image:${ext}`]: "" };
            const onSuccess = str.match(new RegExp(`{{${ext.replaceAll(/\+#!-/g, "\\$1")}:(([^{]|{(?!{)|{{[\\s\\S]*?}})*?)(:(([^{]|{(?!{)|{{[\\s\\S]*?}})*?))?}}`))?.[1] || "";
            const onFailure = str.match(new RegExp(`{{${ext.replaceAll(/\+#!-/g, "\\$1")}:(([^{]|{(?!{)|{{[\\s\\S]*?}})*?)(:(([^{]|{(?!{)|{{[\\s\\S]*?}})*?))?}}`))?.[4] || "";
            const files = context["selectedFiles"].split(",");
            const containsTextFile = files.some((file) => file.toLowerCase().endsWith(ext));
            if (!containsTextFile)
                return { result: onFailure, [`textfile:${ext}`]: onFailure };
            return { result: onSuccess, [`textfile:${ext}`]: onSuccess };
        },
        result_keys: [`textfile:${ext}`],
        constant: true,
        fn: async (content) => (await newPlaceholder.apply(`{{${ext}:${content}}}`, { selectedFiles: content })).result,
        example: `{{${ext}:This one if any ${ext} file is selected:This one if no ${ext} file is selected}}`,
        description: `Flow control directive to include some content if any ${ext} file is selected and some other content if no ${ext} file is selected.`,
        hintRepresentation: `{{${ext}:...:...}}`,
        fullRepresentation: `${ext.toUpperCase()} Condition`,
        type: types_1.PlaceholderType.InteractiveDirective,
        categories: [types_1.PlaceholderCategory.Logic, types_1.PlaceholderCategory.Meta],
    };
    return newPlaceholder;
});
/**
 * Directive for directions that will only be included in the prompt if any image files are selected.
 */
const TextFileFlowDirective = {
    name: "contentForTextFiles",
    regex: /{{textfiles:(([^{]|{(?!{)|{{[\s\S]*?}})*?)(:(([^{]|{(?!{)|{{[\s\S]*?}})*?))?}}/g,
    apply: async (str, context) => {
        if (!context)
            return { result: "", contentForTextFiles: "" };
        if (!context["selectedFiles"])
            return { result: "", contentForTextFiles: "" };
        const onSuccess = str.match(/{{textfiles:(([^{]|{(?!{)|{{[\s\S]*?}})*?)(:(([^{]|{(?!{)|{{[\s\S]*?}})*?))?}}/)?.[1] || "";
        const onFailure = str.match(/{{textfiles:(([^{]|{(?!{)|{{[\s\S]*?}})*?)(:(([^{]|{(?!{)|{{[\s\S]*?}})*?))?}}/)?.[4] || "";
        const files = context["selectedFiles"].split(",");
        const contentForTextFiles = files.some((file) => file_extensions_1.textFileExtensions.some((ext) => file.toLowerCase().endsWith(ext)));
        if (!contentForTextFiles)
            return { result: onFailure, contentForTextFiles: onFailure };
        return { result: onSuccess, contentForTextFiles: onSuccess };
    },
    result_keys: ["contentForTextFiles"],
    constant: true,
    fn: async (content) => (await TextFileFlowDirective.apply(`{{textfiles:${content}}}`)).result,
    example: "{{textfiles:This one if any text file is selected:This one if no text file is selected}}",
    description: "Flow control directive to include some content if any text file is selected and some other content if no text file is selected.",
    hintRepresentation: "{{textfiles:...:...}}",
    fullRepresentation: "Text File Condition",
    type: types_1.PlaceholderType.InteractiveDirective,
    categories: [types_1.PlaceholderCategory.Logic, types_1.PlaceholderCategory.Meta],
};
exports.default = TextFileFlowDirective;
