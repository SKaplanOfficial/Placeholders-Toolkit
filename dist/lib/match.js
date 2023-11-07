"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTTPURL = exports.URI = exports.EmailAddress = exports.Container = exports.Braced = exports.Bool = exports.Float = exports.Integer = exports.List = exports.QuotedParameter = exports.RawParameter = exports.InnerText = void 0;
/** Matches inner text not including braces, unless they wrap a complete placeholder */
const InnerText = (options) => {
    const global = options?.global ?? true;
    if (options?.braceType == undefined || options?.braceType === "curly")
        return new RegExp(`(([^{]|{(?!{)|{{[\s\S]*?}})*?)`, global ? "g" : "");
    else if (options?.braceType == "square")
        return new RegExp(`(([^\[]|\[(?!\[)|\[\[\s\S]*?\]\])*?)`, global ? "g" : "");
    else if (options?.braceType == "round")
        return new RegExp(`(([^(]|\((?!\()|\(\([\s\S]*?\)\))*?)`, global ? "g" : "");
    else if (options?.braceType == "angle")
        return new RegExp(`(([^<]|<(?!<)|<<[\s\S]*?>>)*?)`, global ? "g" : "");
    else
        throw new Error(`Unknown brace type ${options.braceType}`);
};
exports.InnerText = InnerText;
/**
 * Matches a parameter in the form name=Value
 * @param name The name of the parameter
 * @param valueType The type of the value
 * @param options Options for the parameter
 * @param options.optional Whether the parameter is optional
 * @param options.global Whether to match globally
 * @returns A RegExp matching a parameter
 *
 * @example Matching a parameter with a range of possible values
 * ```ts
 * const m2 = RawParameter("data", /(1|2|a|b)/, { global: false });
 * const t2 = "{{placeholder data=1}}";
 * const t3 = "{{placeholder data=b}}";
 * expect(t2.match(m2)?.[2]).toEqual("1");
 * expect(t3.match(m2)?.[2]).toEqual("b");
 * ```
 *
 * @see {@link QuotedParameter}
 */
const RawParameter = (name, valueType, options) => {
    const optional = options?.optional ?? false;
    let valueRegex = "";
    if (valueType) {
        if (valueType instanceof RegExp)
            valueRegex = valueType.source;
        else
            valueRegex = valueType;
    }
    else
        valueRegex = (0, exports.InnerText)(options).source;
    return new RegExp(`(${name}=${valueRegex}${optional ? "|(?<!S)s*)" : ")"}`, options?.global ?? true ? "g" : "");
};
exports.RawParameter = RawParameter;
/**
 * Matches a parameter in the form name="Value"
 * @param name The name of the parameter
 * @param valueType The type of the value
 * @param options Options for the parameter
 * @param options.optional Whether the parameter is optional
 * @param options.global Whether to match globally
 * @returns A RegExp matching a parameter
 *
 * @example Matching a parameter with a URL value
 * ```ts
 * const m1 = QuotedParameter("url", HTTPURL());
 * const t1 = "{{url=\"https://www.google.com\"}}";
 * expect(t1.match(m1)).toBeTruthy();
 * ```
 *
 * @see {@link RawParameter}
 */
const QuotedParameter = (name, valueType, options) => {
    const optional = options?.optional ?? false;
    let valueRegex = "";
    if (valueType) {
        if (valueType instanceof RegExp)
            valueRegex = valueType.source;
        else
            valueRegex = valueType;
    }
    else
        valueRegex = (0, exports.InnerText)(options).source;
    return new RegExp(`(${name}="${valueRegex}"${optional ? "|(?<!S)s*)" : ")"}`, options?.global ?? true ? "g" : "");
};
exports.QuotedParameter = QuotedParameter;
/**
 * Matches a list of values of a specific type
 * @param valueType The type(s) of values to match in the list
 * @param options Options for the list
 * @param options.separator The separator between values in the list
 * @param options.global Whether to match globally
 * @returns A RegExp matching a list of values
 *
 * @example Matching a list of integers
 * ```ts
 * const m1 = List(Integer());
 * const t1 = "{{list:1,2,3}}";
 * expect(t1.match(m1)).toEqual(["1", "2", "3"]);
 * ```
 *
 * @example Matching a mixed list
 * ```ts
 * const m1 = List([Bool(), Integer(), HTTPURL()]);
 * const t1 = "{{list:1,https://www.google.com,true}}";
 * expect(t1.match(m1)).toEqual(["1", "https://www.google.com", "true"]);
 * ```
 */
const List = (valueType, options) => {
    const separator = options?.separator ?? ",";
    const global = options?.global ?? true;
    const valueRegex = valueType instanceof RegExp
        ? valueType.source
        : valueType instanceof Array
            ? valueType.map((v) => (v instanceof RegExp ? v.source : v)).join("|")
            : valueType;
    return new RegExp(`((${valueRegex})(?:${separator}(${valueRegex}))*?)`, global ? "g" : "");
};
exports.List = List;
/** Matches any integer number, positive or negative */
const Integer = (global = true) => new RegExp(/(-?\d+)/, global ? "g" : "");
exports.Integer = Integer;
/** Matches any decimal number, positive or negative */
const Float = (global = true) => new RegExp(/(-?\d+(\.\d+)?)/, global ? "g" : "");
exports.Float = Float;
/** Matches true or false */
const Bool = (global = true) => new RegExp(/(true|false)/, global ? "g" : "");
exports.Bool = Bool;
/** Matches text surrounded by {{braces}} */
const Braced = (innerMatch, options) => {
    const global = options?.global ?? true;
    if (options?.braceType == undefined || options?.braceType === "curly")
        return new RegExp(`{{(${innerMatch instanceof RegExp ? innerMatch.source : innerMatch})}}`, global ? "g" : "");
    else if (options?.braceType == "square")
        return new RegExp(`\[\[(${innerMatch instanceof RegExp ? innerMatch.source : innerMatch})\]\]`, global ? "g" : "");
    else if (options?.braceType == "round")
        return new RegExp(`\(\((${innerMatch instanceof RegExp ? innerMatch.source : innerMatch})\)\)`, global ? "g" : "");
    else if (options?.braceType == "angle")
        return new RegExp(`<<(${innerMatch instanceof RegExp ? innerMatch.source : innerMatch})>>`, global ? "g" : "");
    else
        throw new Error(`Unknown brace type ${options.braceType}`);
};
exports.Braced = Braced;
/**
 * Constructs a regex for a placeholder container in the format {{name parameter1 parameter2 ... parameterN}}:value}}
 * @param name The name of the placeholder
 * @param parameters The parameters of the placeholder
 * @param valueType The type of the placeholder's value
 * @param options Options for the placeholder
 * @param options.braceType The type of braces to use
 * @param options.global Whether to match globally
 * @returns A RegExp matching a placeholder container
 *
 * @example Using a container to match a placeholder and extract its value
 * ```ts
 * const placeholderRegex = Container("myPlaceholder", [], InnerText());
 * const myPlaceholder = PLCreator.newPlaceholder("myPlaceholder", {
 *   regex: placeholderRegex,
 *   apply_fn: async (str, context) => {
 *     const matches = str.match(new RegExp(placeholderRegex.source));
 *     return { result: matches?.[3] || "" }
 *   }
 * })
 * const result = await PLApplicator.bulkApply("{{myPlaceholder:hello, world!}}", undefined, [myPlaceholder])
 * console.log(result) // hello, world!
 * ```
 */
const Container = (name, parameters, valueType, options) => {
    const global = options?.global ?? true;
    if (options?.braceType == undefined || options?.braceType === "curly")
        return new RegExp(`{{${name}(\\s*?${parameters
            .map((p) => (p instanceof RegExp ? p.source : p))
            .join("\\s*?")}):(${valueType instanceof RegExp ? valueType.source : valueType})}}`, global ? "g" : "");
    else if (options?.braceType == "square")
        return new RegExp(`\[\[${name}(\\s*?${parameters
            .map((p) => (p instanceof RegExp ? p.source : p))
            .join("\\s*?")}):(${valueType instanceof RegExp ? valueType.source : valueType})\]\]`, global ? "g" : "");
    else if (options?.braceType == "round")
        return new RegExp(`\(\(${name}(\\s*?${parameters
            .map((p) => (p instanceof RegExp ? p.source : p))
            .join("\\s*?")}):(${valueType instanceof RegExp ? valueType.source : valueType})\)\)`, global ? "g" : "");
    else if (options?.braceType == "angle")
        return new RegExp(`<<${name}(\\s*?${parameters
            .map((p) => (p instanceof RegExp ? p.source : p))
            .join("\\s*?")}):(${valueType instanceof RegExp ? valueType.source : valueType})>>`, global ? "g" : "");
    else
        throw new Error(`Unknown brace type ${options.braceType}`);
};
exports.Container = Container;
/**
 * Matches an RFC 5322 compliant email address
 * @param global Whether to match globally.
 * @returns A RegExp matching an email address.
 *
 * @example Construct an Email Placeholder Regex
 * ```ts
 * const emailPlaceholderRegex = Matches.Container("email", [], Matches.EmailAddress());
 * console.log(emailPlaceholderRegex.test("{{email:johnny.appleseed@apple.com}}")); // true
 * console.log(emailPlaceholderRegex.test("{{email:http://www.google.com}}")); // false
 * ```
 *
 * @see https://www.regular-expressions.info/email.html
 */
const EmailAddress = (global = true) => new RegExp(/(?=[a-z0-9@.!#$%&'*+\/=?^_`{|}~-]{6,254})(?=[a-z0-9.!#$%&'*+\/=?^_`{|}~-]{1,64}@)[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:(?=[a-z0-9-]{1,63}\.)[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?=[a-z0-9-]{1,63})[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/, global ? "g" : "");
exports.EmailAddress = EmailAddress;
/**
 * Matches a URI using the RFC 3986 standard. Matches any scheme.
 * @param global Whether to match globally.
 * @returns A RegExp matching a URI.
 *
 * @example Construct a URI Placeholder Regex
 * ```ts
 * const uriPlaceholderRegex = Matches.Container("uri", [], Matches.URI());
 * console.log(uriPlaceholderRegex.test("{{uri:gopher://sdf.org:70/1/users/s.kaplan}}")); // true
 * console.log(uriPlaceholderRegex.test("{{uri:hello, world!}}")); // false
 * ```
 *
 * @see {@link HTTPURL}
 * @see https://gist.github.com/dperini/729294
 */
const URI = (global = true) => new RegExp(/(?:(?:([a-zA-Z0-9]+):)\/?\/?)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9][a-z0-9_-]{0,62})?[a-z0-9]\.)+(?:[a-z]{2,}\.?))(?::\d{2,5})?(?:[\/?#]\S*)?/, global ? "g" : "");
exports.URI = URI;
/**
 * Matches an HTTP/S URL.
 * @param global Whether to match globally.
 * @returns A RegExp matching an HTTP/S URL.
 *
 * @example Construct an HTTP URL Placeholder Regex
 * ```ts
 * const httpURLPlaceholderRegex = Matches.Container("url", [], Matches.HTTPURL());
 * console.log(httpURLPlaceholderRegex.test("{{url:https://www.google.com}}")); // true
 * console.log(httpURLPlaceholderRegex.test("{{url:hello, world!}}")); // false
 * ```
 *
 * @see {@link URI}
 * @see https://gist.github.com/dperini/729294
 */
const HTTPURL = (global = true) => new RegExp(/(?:(?:(?:https?):)\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9][a-z0-9_-]{0,62})?[a-z0-9]\.)+(?:[a-z]{2,}\.?))(?::\d{2,5})?(?:[\/?#]\S*)?/, global ? "g" : "");
exports.HTTPURL = HTTPURL;
