"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
const scripts_1 = require("../scripts");
/**
 * Placeholder for the comma-separated list of track names in Music.app.
 */
const MusicTracksPlaceholder = {
    name: "musicTracks",
    regex: /{{musicTracks}}/g,
    apply: async (str, context) => {
        if (context && "musicTracks" in context) {
            return {
                result: context["musicTracks"],
                musicTracks: context["musicTracks"],
            };
        }
        const tracks = await (0, scripts_1.getTrackNames)();
        return { result: tracks, musicTracks: tracks };
    },
    result_keys: ["musicTracks"],
    constant: true,
    fn: async () => (await MusicTracksPlaceholder.apply("{{musicTracks}}")).result,
    example: "Recommend some new songs based on the themes of these songs: {{musicTracks}}",
    description: "Replaced with a comma-separated list of track names in Music.app.",
    hintRepresentation: "{{musicTracks}}",
    fullRepresentation: "List of Music Tracks",
    type: types_1.PlaceholderType.Informational,
    categories: [types_1.PlaceholderCategory.Applications],
};
exports.default = MusicTracksPlaceholder;
