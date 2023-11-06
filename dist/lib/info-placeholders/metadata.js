"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const scripts_1 = require("../scripts");
const types_1 = require("../types");
const fs = __importStar(require("fs"));
/**
 * Placeholder for metadata of the currently selected files in Finder as a comma-separated list.
 */
const FileMetadataPlaceholder = {
    name: "metadata",
    regex: /{{metadata}}/g,
    apply: async (str, context) => {
        const files = (context && "selectedFiles" in context
            ? context["selectedFiles"]
            : (await (0, scripts_1.getSelectedFiles)()).csv).split(", ");
        const metadata = context && "metadata" in context
            ? context["metadata"]
            : files
                .map((file) => {
                const fileMetadata = Object.entries(fs.lstatSync(file))
                    .map(([key, value]) => `${key}:${value}`)
                    .join("\n");
                return `${file}:\n${fileMetadata}`;
            })
                .join("\n\n");
        return { result: metadata, metadata: metadata, selectedFiles: files.join(", ") };
    },
    result_keys: ["metadata", "selectedFiles"],
    constant: true,
    fn: async () => (await FileMetadataPlaceholder.apply("{{metadata}}")).result,
    example: "Which of these has the largest filesize? {{metadata}}",
    description: "Replaced with metadata of the currently selected files in Finder as a comma-separated list. If no files are selected, this will be replaced with an empty string.",
    hintRepresentation: "{{metadata}}",
    fullRepresentation: "Selected File Metadata",
    type: types_1.PlaceholderType.Informational,
    categories: [types_1.PlaceholderCategory.Files],
};
exports.default = FileMetadataPlaceholder;
