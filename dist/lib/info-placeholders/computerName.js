"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
const scripts_1 = require("../scripts");
/**
 * Placeholder for the 'pretty' hostname of the current machine. Barring any issues, this should always be replaced.
 */
const ComputerNamePlaceholder = {
    name: "computerName",
    regex: /{{computerName}}/g,
    apply: async (str, context) => {
        if (context && "computerName" in context) {
            return {
                result: context["computerName"],
                computerName: context["computerName"],
            };
        }
        const name = await (0, scripts_1.getComputerName)();
        return { result: name, computerName: name };
    },
    result_keys: ["computerName"],
    constant: true,
    fn: async () => (await ComputerNamePlaceholder.apply("{{computerName}}")).result,
    example: "Come up with aliases for {{computerName}}",
    description: "Replaced with the 'pretty' hostname of the current machine.",
    hintRepresentation: "{{computerName}}",
    fullRepresentation: "Computer Name",
    type: types_1.PlaceholderType.Informational,
    categories: [types_1.PlaceholderCategory.Device],
};
exports.default = ComputerNamePlaceholder;
