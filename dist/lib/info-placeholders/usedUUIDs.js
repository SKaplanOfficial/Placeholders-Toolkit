"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../directives/persistent-variables/utils");
const types_1 = require("../types");
/**
 * Placeholder for a list of all previously used UUIDs since PromptLab's LocalStorage was last reset.
 */
const UsedUUIDsPlaceholder = {
    name: "usedUUIDs",
    regex: /{{usedUUIDs}}/g,
    apply: async () => {
        const usedUUIDs = await (0, utils_1.getStorage)(utils_1.STORAGE_KEYS.USED_UUIDS);
        if (Array.isArray(usedUUIDs)) {
            return { result: usedUUIDs.join(", "), usedUUIDs: usedUUIDs.join(", ") };
        }
        return { result: "", usedUUIDs: "" };
    },
    result_keys: ["usedUUIDs"],
    constant: false,
    fn: async () => (await UsedUUIDsPlaceholder.apply("{{usedUUIDs}}")).result,
    example: "{{copy:{{usedUUIDs}}}}",
    description: "Replaced with a comma-separated list of all previously used UUIDs since PromptLab's LocalStorage was last reset.",
    hintRepresentation: "{{usedUUIDs}}",
    fullRepresentation: "List of Used UUIDs",
    type: types_1.PlaceholderType.Informational,
    categories: [types_1.PlaceholderCategory.Memory],
};
exports.default = UsedUUIDsPlaceholder;
