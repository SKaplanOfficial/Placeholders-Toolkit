"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PLApplicator = exports.bulkApply = exports.checkForPlaceholders = exports.applyToObjectValuesWithKeys = exports.applyToObjectValueWithKey = exports.applyToStrings = exports.applyToString = void 0;
const defaultPlaceholders_1 = require("./defaultPlaceholders");
/**
 * Applies placeholders to a single string.
 * @param str The string to apply placeholders to.
 * @param context The context to apply placeholders with.
 * @param customPlaceholders The list of custom (user-defined) placeholders. Provide this if you have a separate list of custom placeholders.
 * @param defaultPlaceholders The list of default placeholders. Provide this if you have customized the order of default placeholders or added additional defaults.
 * @param allPlaceholders The list of all placeholders (custom and default). Provide this if you have a single list of all placeholders.
 * @returns The string with placeholders applied.
 */
const applyToString = async (str, context, customPlaceholders, defaultPlaceholders, allPlaceholders) => {
    const sortedPlaceholders = allPlaceholders
        ? allPlaceholders
        : [
            ...(customPlaceholders || []),
            ...(defaultPlaceholders
                ? defaultPlaceholders
                : Object.values(defaultPlaceholders_1.DefaultPlaceholders)),
        ];
    let subbedStr = str;
    for (const placeholder of sortedPlaceholders) {
        if (!subbedStr.match(placeholder.regex))
            continue;
        while (subbedStr.match(placeholder.regex) != undefined) {
            subbedStr = subbedStr.replace(placeholder.regex, (await placeholder.apply(subbedStr, context)).result);
        }
    }
    return subbedStr;
};
exports.applyToString = applyToString;
/**
 * Applies placeholders to an array of strings.
 * @param strs The array of strings to apply placeholders to.
 * @param context The context to apply placeholders with.
 * @returns The array of strings with placeholders applied.
 */
const applyToStrings = async (strs, context) => {
    const subbedStrs = [];
    for (const str of strs) {
        subbedStrs.push(await (0, exports.applyToString)(str, context));
    }
    return subbedStrs;
};
exports.applyToStrings = applyToStrings;
/**
 * Applies placeholders to the value of a single key in an object.
 * @param obj The object to apply placeholders to.
 * @param key The key of the value to apply placeholders to.
 * @param context The context to apply placeholders with.
 * @returns The object with placeholders applied.
 */
const applyToObjectValueWithKey = async (obj, key, context) => {
    const value = obj[key];
    if (typeof value === "string") {
        return await (0, exports.applyToString)(value, context);
    }
    else if (Array.isArray(value)) {
        return await (0, exports.applyToStrings)(value, context);
    }
    else if (typeof value === "object") {
        return await (0, exports.applyToObjectValuesWithKeys)(value, Object.keys(value), context);
    }
    else {
        return (value || "undefined").toString();
    }
};
exports.applyToObjectValueWithKey = applyToObjectValueWithKey;
/**
 * Applies placeholders to an object's values, specified by keys.
 * @param obj The object to apply placeholders to.
 * @param keys The keys of the object to apply placeholders to.
 * @param context The context to apply placeholders with.
 * @returns The object with placeholders applied.
 */
const applyToObjectValuesWithKeys = async (obj, keys, context) => {
    const subbedObj = {};
    for (const key of keys) {
        subbedObj[key] = await (0, exports.applyToObjectValueWithKey)(obj, key, context);
    }
    return subbedObj;
};
exports.applyToObjectValuesWithKeys = applyToObjectValuesWithKeys;
/**
 * Gets a list of placeholders that are included in a string.
 * @param str The string to check.
 * @param customPlaceholders The list of custom (user-defined) placeholders. Provide this if you have a separate list of custom placeholders.
 * @param defaultPlaceholders The list of default placeholders. Provide this if you have customized the order of default placeholders or added additional defaults.
 * @param allPlaceholders The list of all placeholders (custom and default). Provide this if you have a single list of all placeholders.
 * @returns The list of {@link Placeholder} objects.
 */
const checkForPlaceholders = async (str, customPlaceholders, defaultPlaceholders, allPlaceholders) => {
    const sortedPlaceholders = allPlaceholders
        ? allPlaceholders
        : [
            ...(customPlaceholders || []),
            ...(defaultPlaceholders
                ? defaultPlaceholders
                : Object.values(defaultPlaceholders_1.DefaultPlaceholders)),
        ];
    const includedPlaceholders = sortedPlaceholders
        .filter((placeholder) => {
        return (str.match(placeholder.regex) != undefined ||
            str.match(new RegExp("(^| )" +
                placeholder.regex.source.replace("{{", "").replace("}}", ""), "g")) != undefined ||
            str.match(new RegExp(`(^| )(?<!{{)${placeholder.name.replace(/[!#+-]/g, "\\$1")}(?!}})`, "g")) != undefined);
    })
        .sort((placeholderA, placeholderB) => {
        // Order definitive occurrences first
        if (str.match(placeholderA.regex)) {
            return -1;
        }
        else if (str.match(placeholderB.regex)) {
            return 1;
        }
        else {
            return 0;
        }
    });
    return includedPlaceholders;
};
exports.checkForPlaceholders = checkForPlaceholders;
/**
 * Applies placeholders to a string by memoizing the results of each placeholder.
 * @param str The string to apply placeholders to.
 * @param context The context to apply placeholders with.
 * @param customPlaceholders The list of custom (user-defined) placeholders. Provide this if you have a separate list of custom placeholders.
 * @param defaultPlaceholders The list of default placeholders. Provide this if you have customized the order of default placeholders or added additional defaults.
 * @param allPlaceholders The list of all placeholders (custom and default). Provide this if you have a single list of all placeholders.
 * @returns The string with placeholders substituted.
 */
const bulkApply = async (str, context, customPlaceholders, defaultPlaceholders, allPlaceholders) => {
    const sortedPlaceholders = allPlaceholders
        ? allPlaceholders
        : [
            ...(customPlaceholders || []),
            ...(defaultPlaceholders
                ? defaultPlaceholders
                : Object.values(defaultPlaceholders_1.DefaultPlaceholders)),
        ];
    let subbedStr = str;
    const result = { ...(context || {}) };
    // Apply any substitutions that are already in the context
    for (const contextKey in context) {
        const keyHolder = sortedPlaceholders.find((placeholder) => placeholder.name == contextKey);
        if (keyHolder && !(contextKey == "input" && context[contextKey] == "")) {
            subbedStr = subbedStr.replace(new RegExp(keyHolder.regex.source + "(?=(}}|[\\s\\S]|$))", "g"), context[contextKey]);
        }
    }
    for (const placeholder of sortedPlaceholders) {
        const keysToCheck = [];
        if (subbedStr.match(placeholder.regex)) {
            keysToCheck.push(placeholder.regex);
        }
        // Skip if the placeholder isn't in the string
        if (keysToCheck.length == 0)
            continue;
        const result_keys = placeholder.result_keys?.filter((key) => !(key in result) || (result[key] == "" && key == "input"));
        if (result_keys != undefined && result_keys.length == 0)
            continue; // Placeholder is already in the context
        // Add any dependencies of this placeholder to the list of keys to check
        keysToCheck.push(...(placeholder.dependencies?.reduce((acc, dependencyName) => {
            // Get the placeholder that matches the dependency name
            const dependency = sortedPlaceholders.find((placeholder) => placeholder.name == dependencyName);
            if (!dependency)
                return acc;
            // Add the placeholder key to the list of keys to check
            acc.push(dependency.regex);
            return acc;
        }, []) || []));
        for (const newKey of keysToCheck) {
            // Apply the placeholder and store the result
            while (subbedStr.match(newKey) != undefined) {
                const intermediateResult = await placeholder.apply(subbedStr, result);
                if (placeholder.constant) {
                    subbedStr = subbedStr.replace(new RegExp(newKey.source + "(?=(}}|[\\s\\S]|$))", "g"), intermediateResult.result);
                }
                else {
                    subbedStr = subbedStr.replace(new RegExp(newKey.source + "(?=(}}|[\\s\\S]|$))"), intermediateResult.result);
                }
                for (const [key, value] of Object.entries(intermediateResult)) {
                    result[key] = value;
                    if (result_keys?.includes(key)) {
                        result_keys.splice(result_keys.indexOf(key), 1);
                    }
                }
                // Don't waste time applying other occurrences if the result is constant
                if (placeholder.constant) {
                    break;
                }
            }
        }
    }
    return subbedStr;
};
exports.bulkApply = bulkApply;
/**
 * Object for managing placeholder application.
 */
exports.PLApplicator = {
    applyToString: exports.applyToString,
    applyToStrings: exports.applyToStrings,
    applyToObjectValueWithKey: exports.applyToObjectValueWithKey,
    applyToObjectValuesWithKeys: exports.applyToObjectValuesWithKeys,
    checkForPlaceholders: exports.checkForPlaceholders,
    bulkApply: exports.bulkApply,
};
