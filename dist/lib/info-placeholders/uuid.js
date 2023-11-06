"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../directives/persistent-variables/utils");
const types_1 = require("../types");
const crypto_1 = __importDefault(require("crypto"));
/**
 * Placeholder for a unique UUID. The UUID will be unique for each use of the placeholder (but there is no guarantee that it will be unique across different instances of the extension, e.g. on different computers).
 */
const UUIDPlaceholder = {
    name: "uuid",
    regex: /{{(uuid|UUID)}}/g,
    apply: async () => {
        let newUUID = crypto_1.default.randomUUID();
        const usedUUIDs = await (0, utils_1.getStorage)(utils_1.STORAGE_KEYS.USED_UUIDS);
        if (Array.isArray(usedUUIDs)) {
            while (usedUUIDs.includes(newUUID)) {
                newUUID = crypto_1.default.randomUUID();
            }
            usedUUIDs.push(newUUID);
            await (0, utils_1.setStorage)(utils_1.STORAGE_KEYS.USED_UUIDS, usedUUIDs);
        }
        else {
            await (0, utils_1.setStorage)(utils_1.STORAGE_KEYS.USED_UUIDS, [newUUID]);
        }
        return { result: newUUID, uuid: newUUID };
    },
    result_keys: ["uuid" + crypto_1.default.randomUUID()],
    constant: false,
    fn: async () => (await UUIDPlaceholder.apply("{{uuid}}")).result,
    example: "{{copy:{{uuid}}}}",
    description: "Replaced with a unique UUID. UUIDs are tracked in the {{usedUUIDs}} placeholder.",
    hintRepresentation: "{{uuid}}",
    fullRepresentation: "New UUID",
    type: types_1.PlaceholderType.Informational,
    categories: [types_1.PlaceholderCategory.Memory],
};
exports.default = UUIDPlaceholder;
