"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@raycast/utils");
const types_1 = require("../types");
/**
 * Placeholder for the default language for the current user. Barring any issues, this should always be replaced.
 */
const SystemLanguagePlaceholder = {
    name: "systemLanguage",
    regex: /{{(systemLanguage|language)}}/g,
    apply: async (str, context) => {
        const lang = context && "lang" in context
            ? context["lang"]
            : await (0, utils_1.runAppleScript)(`use framework "Foundation"
              set locale to current application's NSLocale's autoupdatingCurrentLocale()
              set langCode to locale's languageCode()
              return (locale's localizedStringForLanguageCode:langCode) as text`);
        return { result: lang, systemLanguage: lang };
    },
    result_keys: ["systemLanguage"],
    constant: true,
    fn: async () => (await SystemLanguagePlaceholder.apply("{{systemLanguage}}")).result,
    example: 'Translate "Ciao" to {{systemLanguage}}',
    description: "Replaced with the name of the default language for the current user.",
    hintRepresentation: "{{systemLanguage}}",
    fullRepresentation: "System Language",
    type: types_1.PlaceholderType.Informational,
    categories: [types_1.PlaceholderCategory.Device],
};
exports.default = SystemLanguagePlaceholder;
