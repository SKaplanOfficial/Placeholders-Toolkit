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
const types_1 = require("../types");
const os = __importStar(require("os"));
const fs = __importStar(require("fs"));
/**
 * Placeholder for the raw text of a file at the given path. The path can be absolute or relative to the user's home directory (e.g. `~/Desktop/file.txt`). The file must be readable as UTF-8 text, or the placeholder will be replaced with an empty string.
 */
const FilePlaceholder = {
    name: "file",
    regex: /{{file:(.|^[\s\n\r])*?}}/g,
    apply: async (str) => {
        const target = str.match(/(?<=(file:))[\s\S]*?(?=}})/)?.[0];
        if (!target)
            return { result: "", file: "" };
        const filePath = target.startsWith("~")
            ? target.replace("~", os.homedir())
            : target;
        if (filePath == "")
            return { result: "", file: "" };
        if (!filePath.startsWith("/"))
            return { result: "", file: "" };
        try {
            const text = fs.readFileSync(filePath, "utf-8");
            return { result: text, file: text };
        }
        catch (e) {
            return { result: "", file: "" };
        }
    },
    constant: false,
    fn: async (path) => (await FilePlaceholder.apply(`{{file:${path}}}`)).result,
    example: "{{file:/Users/username/Desktop/file.txt}}",
    description: "Placeholder for the raw text of a file at the given path.",
    hintRepresentation: "{{file:...}}",
    fullRepresentation: "Text of File At Path",
    type: types_1.PlaceholderType.InteractiveDirective,
    categories: [types_1.PlaceholderCategory.Files],
};
exports.default = FilePlaceholder;
