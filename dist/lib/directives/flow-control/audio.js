"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AudioDirectives = void 0;
const file_extensions_1 = require("../../data/file-extensions");
const types_1 = require("../../types");
/**
 * Flow control directives for each audio file extension.
 */
exports.AudioDirectives = file_extensions_1.audioFileExtensions.map((ext) => {
    const newPlaceholder = {
        name: `audio:${ext}`,
        regex: new RegExp(`{{${ext}:(([^{]|{(?!{)|{{[\\s\\S]*?}})*?)(:(([^{]|{(?!{)|{{[\\s\\S]*?}})*?))?}}`, "g"),
        apply: async (str, context) => {
            if (!context)
                return { result: "", [`audio:${ext}`]: "" };
            if (!context["selectedFiles"])
                return { result: "", [`audio:${ext}`]: "" };
            const onSuccess = str.match(new RegExp(`{{${ext}:(([^{]|{(?!{)|{{[\\s\\S]*?}})*?)(:(([^{]|{(?!{)|{{[\\s\\S]*?}})*?))?}}`))?.[1] || "";
            const onFailure = str.match(new RegExp(`{{${ext}:(([^{]|{(?!{)|{{[\\s\\S]*?}})*?)(:(([^{]|{(?!{)|{{[\\s\\S]*?}})*?))?}}`))?.[4] || "";
            const files = context["selectedFiles"].split(",");
            const containsImage = files.some((file) => file.toLowerCase().endsWith(ext));
            if (!containsImage)
                return { result: onFailure, [`image:${ext}`]: onFailure };
            return { result: onSuccess, [`image:${ext}`]: onSuccess };
        },
        result_keys: [`audio:${ext}`],
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
 * Directive for directions that will only be included in the prompt if any audio files are selected.
 */
const AudioFlowDirective = {
    name: "contentForAudio",
    regex: /{{audio:(([^{]|{(?!{)|{{[\s\S]*?}})*?)(:(([^{]|{(?!{)|{{[\s\S]*?}})*?))?}}/g,
    apply: async (str, context) => {
        if (!context)
            return { result: "", contentForAudio: "" };
        if (!context["selectedFiles"])
            return { result: "", contentForAudio: "" };
        const onSuccess = str.match(/{{audio:(([^{]|{(?!{)|{{[\s\S]*?}})*?)(:(([^{]|{(?!{)|{{[\s\S]*?}})*?))?}}/)?.[1] || "";
        const onFailure = str.match(/{{audio:(([^{]|{(?!{)|{{[\s\S]*?}})*?)(:(([^{]|{(?!{)|{{[\s\S]*?}})*?))?}}/)?.[4] || "";
        const files = context["selectedFiles"].split(",");
        const containsAudioFile = files.some((file) => file_extensions_1.audioFileExtensions.some((ext) => file.toLowerCase().endsWith(ext)));
        if (!containsAudioFile)
            return { result: onFailure, contentForAudio: onFailure };
        return { result: onSuccess, contentForAudio: onSuccess };
    },
    result_keys: ["contentForAudio"],
    constant: true,
    fn: async (content) => (await AudioFlowDirective.apply(`{{audio:${content}}}`)).result,
    example: "{{audio:This one if any audio file is selected:This one if no audio file is selected}}",
    description: "Flow control directive to include some content if any audio file is selected and some other content if no audio file is selected.",
    hintRepresentation: "{{audio:...:...}}",
    fullRepresentation: "Audio File Condition",
    type: types_1.PlaceholderType.InteractiveDirective,
    categories: [types_1.PlaceholderCategory.Logic, types_1.PlaceholderCategory.Meta],
};
exports.default = AudioFlowDirective;
