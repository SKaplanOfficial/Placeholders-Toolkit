export * from "./defaultPlaceholders";

export {
  checkForPlaceholders,
  applyToString,
  applyToObjectValueWithKey,
  applyToObjectValuesWithKeys,
  applyToStrings,
  bulkApply,
} from "./apply";

export {
  loadPlaceholderFromJSONString,
  loadPlaceholdersFromJSONString,
  loadPlaceholdersFromFile,
} from "./load";

export { dummyPlaceholder, newPlaceholder } from "./new";
