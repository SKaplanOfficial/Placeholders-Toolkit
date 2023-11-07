export { execScript } from "./utils";
export { default as EventFetcher } from "./EventFetcher";

export {
  getInstalledApplications,
  getComputerName,
  getCurrentDirectory,
  getMenubarOwningApplication,
  addFileToSelection,
  getSelectedFiles,
  getRunningApplications,
  getSystemLanguage,
  searchNearbyLocations,
} from "./system";

export { getLastEmail } from "./applications/mail";
export { getLastNote } from "./applications/notes";
export { getCurrentTrack, getTrackNames } from "./applications/music";
