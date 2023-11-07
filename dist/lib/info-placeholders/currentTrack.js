"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
const scripts_1 = require("../scripts");
/**
 * Placeholder for the name of the currently playing track in Music.app.
 */
const CurrentTrackPlaceholder = {
    name: "currentTrack",
    regex: /{{(currentTrack|currentSong)}}/g,
    apply: async (str, context) => {
        if (context && "currentTrack" in context) {
            return {
                result: context["currentTrack"],
                currentTrack: context["currentTrack"],
            };
        }
        const track = await (0, scripts_1.getCurrentTrack)();
        return { result: track, currentTrack: track };
    },
    result_keys: ["currentTrack"],
    constant: true,
    fn: async () => (await CurrentTrackPlaceholder.apply("{{currentTrack}}")).result,
    example: "What's the history behind {{currentTrack}}?",
    description: "Replaced with the name of the currently playing track in Music.app.",
    hintRepresentation: "{{currentTrack}}",
    fullRepresentation: "Name of Current Music Track",
    type: types_1.PlaceholderType.Informational,
    categories: [types_1.PlaceholderCategory.Applications],
};
exports.default = CurrentTrackPlaceholder;
