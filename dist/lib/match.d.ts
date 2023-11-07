/// <reference types="node" />
/** The type of brace surrounding a placeholder. */
export type braceType = "curly" | "square" | "round" | "angle";
/** Matches inner text not including braces, unless they wrap a complete placeholder */
export declare const InnerText: (options?: {
    global?: boolean;
    braceType?: braceType;
}) => RegExp;
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
export declare const RawParameter: (name: string, valueType?: string | RegExp, options?: {
    optional?: boolean;
    global?: boolean;
}) => RegExp;
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
export declare const QuotedParameter: (name: string, valueType?: string | RegExp, options?: {
    optional?: boolean;
    global?: boolean;
}) => RegExp;
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
export declare const List: (valueType: string | RegExp | (string | RegExp)[], options?: {
    separator?: string;
    global?: boolean;
}) => RegExp;
/** Matches any integer number, positive or negative */
export declare const Integer: (global?: boolean) => RegExp;
/** Matches any decimal number, positive or negative */
export declare const Float: (global?: boolean) => RegExp;
/** Matches true or false */
export declare const Bool: (global?: boolean) => RegExp;
/** Matches text surrounded by {{braces}} */
export declare const Braced: (innerMatch: string | RegExp, options?: {
    global?: boolean;
    braceType?: braceType;
}) => RegExp;
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
export declare const Container: (name: string, parameters: (string | RegExp)[], valueType: string | RegExp, options?: {
    braceType?: braceType;
    global?: boolean;
}) => RegExp;
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
export declare const EmailAddress: (global?: boolean) => RegExp;
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
export declare const URI: (global?: boolean) => RegExp;
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
export declare const HTTPURL: (global?: boolean) => RegExp;
