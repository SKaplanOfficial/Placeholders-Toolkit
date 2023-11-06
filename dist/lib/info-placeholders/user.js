"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
const os_1 = __importDefault(require("os"));
/**
 * Placeholder for the username of the currently logged-in user. Barring any issues, this should always be replaced.
 */
const UserPlaceholder = {
    name: "user",
    regex: /{{(user|username)}}/g,
    apply: async () => {
        const user = os_1.default.userInfo().username;
        return { result: user, user: user };
    },
    result_keys: ["user"],
    constant: true,
    fn: async () => (await UserPlaceholder.apply("{{user}}")).result,
    example: "Come up with nicknames for {{user}}",
    description: "Replaced with the username of the currently logged-in user.",
    hintRepresentation: "{{user}}",
    fullRepresentation: "User Name",
    type: types_1.PlaceholderType.Informational,
    categories: [types_1.PlaceholderCategory.Device],
};
exports.default = UserPlaceholder;
