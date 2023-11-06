"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../../types");
/**
 * Directive for directions that will only be included in the prompt if any PDF files are selected.
 */
const PDFFlowDirective = {
    name: "contentForPDFs",
    regex: /{{(pdf|PDF):(([^{]|{(?!{)|{{[\s\S]*?}})*?)(:(([^{]|{(?!{)|{{[\s\S]*?}})*?))?}}/g,
    apply: async (str, context) => {
        if (!context)
            return { result: "", ["image:pdf"]: "" };
        if (!context["selectedFiles"])
            return { result: "", ["image:pdf"]: "" };
        const onSuccess = str.match(new RegExp(`{{pdf:(([^{]|{(?!{)|{{[\\s\\S]*?}})*?)(:(([^{]|{(?!{)|{{[\\s\\S]*?}})*?))?}}`))?.[1] || "";
        const onFailure = str.match(new RegExp(`{{pdf:(([^{]|{(?!{)|{{[\\s\\S]*?}})*?)(:(([^{]|{(?!{)|{{[\\s\\S]*?}})*?))?}}`))?.[4] || "";
        const files = context["selectedFiles"].split(",");
        const containsImage = files.some((file) => file.toLowerCase().endsWith("pdf"));
        if (!containsImage)
            return { result: onFailure, ["image:pdf"]: onFailure };
        return { result: onSuccess, ["image:pdf"]: onSuccess };
    },
    result_keys: ["contentForPDFs"],
    constant: true,
    fn: async (content) => (await PDFFlowDirective.apply(`{{pdf:${content}}}`)).result,
    example: "{{pdf:This one if any PDF file is selected:This one if no PDF file is selected}}",
    description: "Flow control directive to include some content if any PDF file is selected and some other content if no PDF file is selected.",
    hintRepresentation: "{{pdf:...:...}}",
    fullRepresentation: "PDF File Condition",
    type: types_1.PlaceholderType.InteractiveDirective,
    categories: [types_1.PlaceholderCategory.Logic, types_1.PlaceholderCategory.Meta],
};
exports.default = PDFFlowDirective;
