"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
const os_1 = __importDefault(require("os"));
/**
 * Placeholder for the hostname of the current machine. Barring any issues, this should always be replaced.
 */
const HostnamePlaceholder = {
    name: "hostname",
    regex: /{{hostname}}/g,
    apply: async () => {
        const name = os_1.default.hostname();
        return { result: name, hostname: name };
    },
    result_keys: ["hostname"],
    constant: true,
    fn: async () => (await HostnamePlaceholder.apply("{{hostname}}")).result,
    example: "Come up with aliases for {{hostname}}",
    description: "Replaced with the hostname of the current machine.",
    hintRepresentation: "{{hostname}}",
    fullRepresentation: "Device Hostname",
    type: types_1.PlaceholderType.Informational,
    categories: [types_1.PlaceholderCategory.Device],
};
exports.default = HostnamePlaceholder;
