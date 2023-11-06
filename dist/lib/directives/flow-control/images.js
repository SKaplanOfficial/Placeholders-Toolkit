"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageDirectives = void 0;
const file_extensions_1 = require("../../data/file-extensions");
const types_1 = require("../../types");
/**
 * Flow control directives for each image file extension.
 */
exports.ImageDirectives = file_extensions_1.imageFileExtensions.map((ext) => {
    const newPlaceholder = {
        name: `image:${ext}`,
        regex: new RegExp(`{{${ext}:(([^{]|{(?!{)|{{[\\s\\S]*?}})*?)(:(([^{]|{(?!{)|{{[\\s\\S]*?}})*?))?}}`, "g"),
        apply: async (str, context) => {
            if (!context)
                return { result: "", [`image:${ext}`]: "" };
            if (!context["selectedFiles"])
                return { result: "", [`image:${ext}`]: "" };
            const onSuccess = str.match(new RegExp(`{{${ext}:(([^{]|{(?!{)|{{[\\s\\S]*?}})*?)(:(([^{]|{(?!{)|{{[\\s\\S]*?}})*?))?}}`))?.[1] ||
                "";
            const onFailure = str.match(new RegExp(`{{${ext}:(([^{]|{(?!{)|{{[\\s\\S]*?}})*?)(:(([^{]|{(?!{)|{{[\\s\\S]*?}})*?))?}}`))?.[4] ||
                "";
            const files = context["selectedFiles"].split(",");
            const containsImage = files.some((file) => file.toLowerCase().endsWith(ext));
            if (!containsImage)
                return { result: onFailure, [`image:${ext}`]: onFailure };
            return { result: onSuccess, [`image:${ext}`]: onSuccess };
        },
        result_keys: [`image:${ext}`],
        constant: true,
        fn: async (content) => (await newPlaceholder.apply(`{{${ext}:${content}}}`)).result,
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
const ImageFlowDirective = {
    name: "contentForImages",
    regex: /{{images:(([^{]|{(?!{)|{{[\s\S]*?}})*?)(:(([^{]|{(?!{)|{{[\s\S]*?}})*?))?}}/g,
    apply: async (str, context) => {
        if (!context)
            return { result: "", contentForImages: "" };
        if (!context["selectedFiles"])
            return { result: "", contentForImages: "" };
        const onSuccess = str.match(/{{images:(([^{]|{(?!{)|{{[\s\S]*?}})*?)(:(([^{]|{(?!{)|{{[\s\S]*?}})*?))?}}/)?.[1] || "";
        const onFailure = str.match(/{{images:(([^{]|{(?!{)|{{[\s\S]*?}})*?)(:(([^{]|{(?!{)|{{[\s\S]*?}})*?))?}}/)?.[4] || "";
        const files = context["selectedFiles"].split(",");
        const contentForImages = files.some((file) => file_extensions_1.imageFileExtensions.some((ext) => file.toLowerCase().endsWith(ext)));
        if (!contentForImages)
            return { result: onFailure, contentForImages: onFailure };
        return { result: onSuccess, contentForImages: onSuccess };
    },
    result_keys: ["contentForImages"],
    constant: true,
    fn: async (content) => (await ImageFlowDirective.apply(`{{images:${content}}}`)).result,
    example: "{{images:This one if any image file is selected:This one if no image file is selected}}",
    description: "Flow control directive to include some content if any image file is selected and some other content if no image file is selected.",
    hintRepresentation: "{{images:...:...}}",
    fullRepresentation: "Image File Condition",
    type: types_1.PlaceholderType.InteractiveDirective,
    categories: [types_1.PlaceholderCategory.Logic, types_1.PlaceholderCategory.Meta],
};
exports.default = ImageFlowDirective;
