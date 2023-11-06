"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
const os_1 = __importDefault(require("os"));
/**
 * Placeholder for the home directory of the currently logged-in user. Barring any issues, this should always be replaced.
 */
const HomeDirPlaceholder = {
    name: "homedir",
    regex: /{{(homedir|homeDirectory)}}/g,
    apply: async () => {
        const dir = os_1.default.homedir();
        return { result: dir, homedir: dir };
    },
    result_keys: ["homedir"],
    constant: true,
    fn: async () => (await HomeDirPlaceholder.apply("{{homedir}}")).result,
    example: '{{as:tell application "Finder" to reveal POSIX file "{{homedir}}"}}',
    description: "Replaced with the path of the home directory for the currently logged-in user.",
    hintRepresentation: "{{homedir}}",
    fullRepresentation: "Home Directory Path",
    type: types_1.PlaceholderType.Informational,
    categories: [types_1.PlaceholderCategory.Device],
};
exports.default = HomeDirPlaceholder;
