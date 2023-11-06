"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
const utils_1 = require("../utils");
/**
 * Replaces YouTube placeholders with the transcript of the corresponding YouTube video.
 */
const YouTubeTranscriptPlaceholder = {
    name: "youtube",
    regex: /{{(youtube|yt):[\s\S]*?}}/g,
    apply: async (str) => {
        const specifier = str.match(/(?<=(youtube|yt):)[\s\S]*?(?=}})/)?.[0] || "";
        if (specifier.trim().length == 0) {
            return { result: "No video specified" };
        }
        const transcriptText = specifier.startsWith("http")
            ? await (0, utils_1.getYouTubeVideoTranscriptByURL)(specifier)
            : await (0, utils_1.getYouTubeVideoTranscriptById)(await (0, utils_1.getMatchingYouTubeVideoID)(specifier));
        return { result: transcriptText };
    },
    constant: false,
    fn: async (idOrURL) => (await YouTubeTranscriptPlaceholder.apply(`{{youtube:${idOrURL}}}`)).result,
    example: "{{youtube:https://www.youtube.com/watch?v=dQw4w9WgXcQ}}",
    description: "Replaced with the transcript of the corresponding YouTube video.",
    hintRepresentation: "{{youtube:...}}",
    fullRepresentation: "Transcription of YouTube Video",
    type: types_1.PlaceholderType.InteractiveDirective,
    categories: [types_1.PlaceholderCategory.Internet],
};
exports.default = YouTubeTranscriptPlaceholder;
