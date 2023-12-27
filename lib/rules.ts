import { getFrontmostApplication } from "@raycast/api";
import { SupportedBrowsers } from "./utils";

/**
 * Resolves a value or value function to a value.
 * @param value The value or value function to resolve.
 * @returns The resolved value.
 */
const resolveValue = async (value: unknown) => {
  let val = value;
  if (typeof value === "function") val = value();
  val = await Promise.resolve(val);
  return val;
};

/**
 * Returns a rule that checks if the value is truthy.
 * @param value The value or value function to check.
 * @returns The rule function.
 */
export const RequireValue = (
  value: unknown
): ((
  str: string,
  context?: { [key: string]: unknown }
) => Promise<boolean>) => {
  return async () => {
    try {
      if (value === undefined || value === null) return false;
      const val = await resolveValue(value);
      if (Array.isArray(val)) return val.length > 0 && val.every((v) => !!v);
      return val !== undefined && val !== null && val !== "";
    } catch (e) {
      return false;
    }
  };
};

/**
 * Returns a rule that checks if the value is equal to the target.
 * @param value The value or value function to check.
 * @param target The target value to check against.
 * @returns The rule function.
 *
 * @see {@link RequireNotEquals}
 */
export const RequireEquals = (
  value: unknown,
  target: unknown
): ((
  str: string,
  context?: { [key: string]: unknown }
) => Promise<boolean>) => {
  return async () => {
    try {
      const val = await resolveValue(value);
      return val === target;
    } catch (e) {
      return false;
    }
  };
};

/**
 * Returns a rule that checks if the value is not equal to the target.
 * @param value The value or value function to check.
 * @param target The target value to check against.
 * @returns The rule function.
 *
 * @see {@link RequireEquals}
 */
export const RequireNotEquals = (
  value: unknown,
  target: unknown
): ((
  str: string,
  context?: { [key: string]: unknown }
) => Promise<boolean>) => {
  return async () => {
    try {
      const val = await resolveValue(value);
      return val !== target;
    } catch (e) {
      return false;
    }
  };
};

/**
 * Returns a rule that checks if the value is an array that contains the target.
 * @param value The value or value function to check.
 * @param target The target value to check against.
 * @returns The rule function.
 *
 * @see {@link RequireContainedIn}
 */
export const RequireContains = (
  value: unknown[] | (() => unknown[]),
  target: unknown
): ((
  str: string,
  context?: { [key: string]: unknown }
) => Promise<boolean>) => {
  return async () => {
    try {
      const val = await resolveValue(value);
      if (!Array.isArray(val)) return false;
      return val.some((v) => v === target);
    } catch (e) {
      return false;
    }
  };
};

/**
 * Returns a rule that checks if the value is contained in the target array.
 * @param value The value or value function to check.
 * @param target The target array to check against.
 * @returns The rule function.
 *
 * @see {@link RequireContains}
 */
export const RequireContainedIn = (
  value: unknown,
  target: unknown[] | (() => unknown[])
): ((
  str: string,
  context?: { [key: string]: unknown }
) => Promise<boolean>) => {
  return async () => {
    try {
      const val = await resolveValue(value);
      const tg = await resolveValue(target);
      if (!Array.isArray(tg)) return false;
      return tg.some((t) => t === val);
    } catch (e) {
      return false;
    }
  };
};

/**
 * Returns a rule that checks if the frontmost application is a support browser.
 * @returns The rule function.
 */
export const RequireActiveBrowser = (): ((
  str: string,
  context?: { [key: string]: unknown }
) => Promise<boolean>) => {
  return async () => {
    try {
      const currentAppName = (await getFrontmostApplication()).name || "";
      return (
        SupportedBrowsers.find((b) => b.name == currentAppName) !== undefined
      );
    } catch (e) {
      return false;
    }
  };
};
