import { Placeholder } from "../types";
/**
 * Placeholder for the raw text of a file at the given path. The path can be absolute or relative to the user's home directory (e.g. `~/Desktop/file.txt`). The file must be readable as UTF-8 text, or the placeholder will be replaced with an empty string.
 */
declare const FilePlaceholder: Placeholder;
export default FilePlaceholder;
