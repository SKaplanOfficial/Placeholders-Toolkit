"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchNearbyLocations = exports.getSystemLanguage = exports.getRunningApplications = exports.getSelectedFiles = exports.addFileToSelection = exports.getMenubarOwningApplication = exports.getCurrentDirectory = exports.getComputerName = exports.getInstalledApplications = void 0;
const utils_1 = require("@raycast/utils");
/**
 * Gets a list of currently installed applications.
 *
 * @returns A promise resolving to the list of apps as a string.
 */
const getInstalledApplications = async () => {
    return (0, utils_1.runAppleScript)(`use framework "Foundation"

    property ca : current application
    property theResult : ""
    property query : missing value
    
    try
      set result to ""
      ca's NSNotificationCenter's defaultCenter's addObserver:me selector:"queryDidFinish:" |name|:"NSMetadataQueryDidFinishGatheringNotification" object:(missing value)
      set predicate to ca's NSPredicate's predicateWithFormat:"kMDItemContentType == 'com.apple.application-bundle'"
      set query to ca's NSMetadataQuery's alloc()'s init()
      query's setPredicate:predicate
      query's setSearchScopes:["/Applications", "/Users/"]
      query's startQuery()
      
      repeat while theResult is ""
        delay 0.1
      end repeat
      
      return text 1 thru ((length of theResult) - 2) of theResult
    end try
    
    on queryDidFinish:theNotification
      global result
      set queryResults to theNotification's object()'s results()
      set internalResult to ""
      repeat with object in queryResults
        set itemName to (object's valueForAttribute:("kMDItemFSName")) as text
        set appName to (text 1 thru ((length of itemName) - 4) of itemName)
        if appName does not contain "." and appName does not contain "_" and appName does not end with "Agent" and appName does not end with "Assistant" then
          set internalResult to internalResult & appName & ", "
        end if
      end repeat
      set theResult to internalResult
    end queryDidFinish:`);
};
exports.getInstalledApplications = getInstalledApplications;
/**
 * Gets the computer's name.
 *
 * @returns A promise resolving to the computer name as a string.
 */
const getComputerName = async () => {
    return await (0, utils_1.runAppleScript)(`use scripting additions
  return computer name of ((system info) as record)`);
};
exports.getComputerName = getComputerName;
/**
 * Gets the current Finder directory.
 * @returns A promise resolving to the path of the current directory as a string.
 */
const getCurrentDirectory = async () => {
    return await (0, utils_1.runAppleScript)(`tell application "Finder"
    return POSIX path of (insertion location as alias)
  end tell`);
};
exports.getCurrentDirectory = getCurrentDirectory;
/**
 * Gets the application that owns the menubar.
 * @param includePaths Whether to include the path of the application.
 * @returns A promise resolving to the name of the application as a string, or an object containing the name and path if includePaths is true.
 */
const getMenubarOwningApplication = async (includePaths) => {
    const app = await (0, utils_1.runAppleScript)(`use framework "Foundation"
  use scripting additions
  set workspace to current application's NSWorkspace's sharedWorkspace()
  set runningApps to workspace's runningApplications()
  
  set targetApp to missing value
  repeat with theApp in runningApps
    if theApp's ownsMenuBar() then
      set targetApp to theApp
      exit repeat
    end if
  end repeat
  
  if targetApp is missing value then
    return ""
  else
    ${includePaths
        ? `return {targetApp's localizedName() as text, targetApp's bundleURL()'s fileSystemRepresentation() as text}`
        : `return targetApp's localizedName() as text`}
  end if`);
    if (includePaths) {
        const data = app.split(", ");
        return { name: data[0], path: data[1] };
    }
    return app;
};
exports.getMenubarOwningApplication = getMenubarOwningApplication;
/**
 * Adds a file to the current Finder selection.
 * @param filePath The path of the file to add to the selection.
 * @returns A promise that resolves to void when the AppleScript has finished running.
 */
const addFileToSelection = async (filePath) => {
    await (0, utils_1.runAppleScript)(`tell application "Finder"
        set theSelection to selection as alias list
        set targetPath to POSIX file "${filePath}"
        copy targetPath to end of theSelection
        select theSelection
    end tell`);
};
exports.addFileToSelection = addFileToSelection;
const getSelectedFiles = async () => {
    const data = await (0, utils_1.runAppleScript)(`tell application "Finder"
      set oldDelimiters to AppleScript's text item delimiters
      set AppleScript's text item delimiters to "::"
      set theSelection to selection
      if theSelection is {} then
        return
      else if (theSelection count) is equal to 1 then
        return the POSIX path of (theSelection as alias)
      else
        set thePaths to {}
        repeat with i from 1 to (theSelection count)
          copy (POSIX path of (item i of theSelection as alias)) to end of thePaths
        end repeat
        set thePathsString to thePaths as text
        set AppleScript's text item delimiters to oldDelimiters
        return thePathsString
      end if
    end tell`);
    const paths = data.split("::").map((path) => path.trim());
    const csv = paths.join(",");
    return { paths, csv };
};
exports.getSelectedFiles = getSelectedFiles;
/**
 * Gets the names of all currently running non-background applications.
 * @returns A promise that resolves to a comma-separated list of application names.
 */
const getRunningApplications = async () => {
    return (0, utils_1.runAppleScript)(`tell application "System Events"
            return displayed name of every application process whose background only is false
        end tell`);
};
exports.getRunningApplications = getRunningApplications;
/**
 * Gets the name of the system's language.
 * @returns A promise that resolves to the name of the system language as a string.
 */
const getSystemLanguage = async () => {
    return (0, utils_1.runAppleScript)(`use framework "Foundation"
        set locale to current application's NSLocale's autoupdatingCurrentLocale()
        set langCode to locale's languageCode()
        return locale's localizedStringForLanguageCode:langCode`);
};
exports.getSystemLanguage = getSystemLanguage;
/**
 * Searches for nearby locations matching the provided query.
 * @param query The query to search for.
 * @returns A promise that resolves to a new-line-separated list of addresses.
 */
const searchNearbyLocations = async (query) => {
    return (0, utils_1.runAppleScript)(`set jxa to "(() => {
        ObjC.import('MapKit');
      
        const searchRequest = $.MKLocalSearchRequest.alloc.init;
        searchRequest.naturalLanguageQuery = '${query}';
      
        const search = $.MKLocalSearch.alloc.initWithRequest(searchRequest);
        let addresses = [];
        search.startWithCompletionHandler((response, error) => {
          if (error.localizedDescription) {
            console.error(error.localizedDescription.js);
          } else {
            const numItems = response.mapItems.count > 10 ? 10 : response.mapItems.count;
            for (let i = 0; i < numItems; i++) {
              const item = response.mapItems.objectAtIndex(i);
              const placemark = item.placemark;
              addresses.push(\`\${item.name.js}, \${placemark.subThoroughfare.js} \${placemark.thoroughfare.js}, \${placemark.locality.js}, \${placemark.administrativeArea.js}\`);
            }
          }
        });
      
        const startDate = $.NSDate.date;
        while (startDate.timeIntervalSinceNow > -2) {
          runLoop = $.NSRunLoop.currentRunLoop;
          today = $.NSDate.dateWithTimeIntervalSinceNow(0.1);
          runLoop.runUntilDate(today);
        }

        return addresses.join(\`
        \`);
      })();"
      
      return run script jxa in "JavaScript"`);
};
exports.searchNearbyLocations = searchNearbyLocations;
