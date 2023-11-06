/**
 * Gets the subject, sender, and content of the most recently received email in Mail.app.
 *
 * @returns A promise resolving to the email as a string.
 */
export declare const getLastEmail: () => Promise<string>;
