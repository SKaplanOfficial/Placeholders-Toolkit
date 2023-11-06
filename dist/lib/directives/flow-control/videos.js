"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoDirectives = void 0;
const file_extensions_1 = require("../../data/file-extensions");
const types_1 = require("../../types");
/**
 * Flow control directives for each video file extension.
 */
exports.VideoDirectives = file_extensions_1.videoFileExtensions.map((ext) => {
    const newPlaceholder = {
        name: `video:${ext}`,
        regex: new RegExp(`{{${ext}:(([^{]|{(?!{)|{{[\\s\\S]*?}})*?)(:(([^{]|{(?!{)|{{[\\s\\S]*?}})*?))?}}`, "g"),
        apply: async (str, context) => {
            if (!context)
                return { result: "", [`video:${ext}`]: "" };
            if (!context["selectedFiles"])
                return { result: "", [`video:${ext}`]: "" };
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
        result_keys: [`video:${ext}`],
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
 * Directive for directions that will only be included in the prompt if any video files are selected.
 */
const VideoFlowDirective = {
    name: "contentForVideos",
    regex: /{{videos:(([^{]|{(?!{)|{{[\s\S]*?}})*?)(:(([^{]|{(?!{)|{{[\s\S]*?}})*?))?}}/g,
    apply: async (str, context) => {
        if (!context)
            return { result: "", contentForVideos: "" };
        if (!context["selectedFiles"])
            return { result: "", contentForVideos: "" };
        const onSuccess = str.match(/{{videos:(([^{]|{(?!{)|{{[\s\S]*?}})*?)(:(([^{]|{(?!{)|{{[\s\S]*?}})*?))?}}/)?.[1] || "";
        const onFailure = str.match(/{{videos:(([^{]|{(?!{)|{{[\s\S]*?}})*?)(:(([^{]|{(?!{)|{{[\s\S]*?}})*?))?}}/)?.[4] || "";
        const files = context["selectedFiles"].split(",");
        const contentForVideos = files.some((file) => file_extensions_1.videoFileExtensions.some((ext) => file.toLowerCase().endsWith(ext)));
        if (!contentForVideos)
            return { result: onFailure, contentForVideos: onFailure };
        return { result: onSuccess, contentForVideos: onSuccess };
    },
    result_keys: ["contentForVideos"],
    constant: true,
    fn: async (content) => (await VideoFlowDirective.apply(`{{videos:${content}}}`)).result,
    example: "{{videos:This one if any video file is selected:This one if no video file is selected}}",
    description: "Flow control directive to include some content if any video file is selected and some other content if no video file is selected.",
    hintRepresentation: "{{videos:...:...}}",
    fullRepresentation: "Video File Condition",
    type: types_1.PlaceholderType.InteractiveDirective,
    categories: [types_1.PlaceholderCategory.Logic, types_1.PlaceholderCategory.Meta],
};
exports.default = VideoFlowDirective;
