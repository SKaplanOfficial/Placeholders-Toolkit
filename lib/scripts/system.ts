import { runAppleScript } from "@raycast/utils";

/**
 * Gets a list of currently installed applications.
 *
 * @returns A promise resolving to the list of apps as a string.
 */
export const getInstalledApplications = async (): Promise<string> => {
  return runAppleScript(`use framework "Foundation"

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

/**
 * Gets the computer's name.
 *
 * @returns A promise resolving to the computer name as a string.
 */
export const getComputerName = async () => {
  return await runAppleScript(`use scripting additions
  return computer name of ((system info) as record)`);
};

/**
 * Gets the current Finder directory.
 * @returns A promise resolving to the path of the current directory as a string.
 */
export const getCurrentDirectory = async () => {
  return await runAppleScript(`tell application "Finder"
    return POSIX path of (insertion location as alias)
  end tell`);
};

/**
 * Gets the application that owns the menubar.
 * @param includePaths Whether to include the path of the application.
 * @returns A promise resolving to the name of the application as a string, or an object containing the name and path if includePaths is true.
 */
export const getMenubarOwningApplication = async (
  includePaths?: boolean
): Promise<string | { name: string; path: string }> => {
  const app = await runAppleScript(`use framework "Foundation"
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
    ${
      includePaths
        ? `return {targetApp's localizedName() as text, targetApp's bundleURL()'s fileSystemRepresentation() as text}`
        : `return targetApp's localizedName() as text`
    }
  end if`);

  if (includePaths) {
    const data = app.split(", ");
    return { name: data[0], path: data[1] };
  }
  return app;
};

/**
 * Adds a file to the current Finder selection.
 * @param filePath The path of the file to add to the selection.
 * @returns A promise that resolves to void when the AppleScript has finished running.
 */
export const addFileToSelection = async (filePath: string) => {
  await runAppleScript(`tell application "Finder"
        set theSelection to selection as alias list
        set targetPath to POSIX file "${filePath}"
        copy targetPath to end of theSelection
        select theSelection
    end tell`);
};

export const getSelectedFiles = async (): Promise<{
  paths: string[];
  csv: string;
}> => {
  const data = await runAppleScript(`tell application "Finder"
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

/**
 * Gets the names of all currently running non-background applications.
 * @returns A promise that resolves to a comma-separated list of application names.
 */
export const getRunningApplications = async (): Promise<string> => {
  return runAppleScript(`tell application "System Events"
            return displayed name of every application process whose background only is false
        end tell`);
};

/**
 * Gets the name of the system's language.
 * @returns A promise that resolves to the name of the system language as a string.
 */
export const getSystemLanguage = async (): Promise<string> => {
  return runAppleScript(`use framework "Foundation"
        set locale to current application's NSLocale's autoupdatingCurrentLocale()
        set langCode to locale's languageCode()
        return locale's localizedStringForLanguageCode:langCode`);
};

/**
 * Searches for nearby locations matching the provided query.
 * @param query The query to search for.
 * @returns A promise that resolves to a new-line-separated list of addresses.
 */
export const searchNearbyLocations = async (query: string) => {
  return runAppleScript(`set jxa to "(() => {
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

/**
 * Prompts the user to choose one or more files/folders.
 * @returns A promise that resolves to a list of POSIX paths.
 */
export const chooseFile = async (allowMultiple = true, folder = false): Promise<string[]> => {
  const jsonString = await runAppleScript(`use framework "AppKit"
  use scripting additions
  
  try
    set theFiles to (choose ${folder == true ? "folder" : "file"} multiple selections allowed ${allowMultiple.toString()})
    
    set thePaths to {}
    if class of theFiles is list then
      repeat with theFile in theFiles
        set end of thePaths to POSIX path of theFile
      end repeat
    else
      set end of thePaths to POSIX path of theFiles
    end if
    
    set jsonObj to current application's NSJSONSerialization's dataWithJSONObject:thePaths options:(current application's NSJSONWritingFragmentsAllowed) |error|:(missing value)
    set jsonString to current application's NSString's alloc()'s initWithData:jsonObj encoding:(current application's NSUTF8StringEncoding)
    return jsonString as text
  on error err
    return "[]"
  end try`)
  return JSON.parse(jsonString) as string[];
}

/**
 * Prompts the user to choose one or more applications.
 * @param allowMultiple Whether to allow multiple applications to be selected.
 * @returns A promise that resolves to a list of application bundle POSIX paths.
 */
export const chooseApplication = async (allowMultiple = false): Promise<string[]> => {
  const jsonString = await runAppleScript(`use framework "AppKit"
  use scripting additions
  
  try
    set theApplications to (choose application multiple selections allowed ${allowMultiple.toString()}
    set thePaths to {}
    if class of theApplications is list then
      repeat with theApplication in theApplications
        set end of thePaths to POSIX path of (path to theApplication)
      end repeat
    else
      set end of thePaths to POSIX path of (path to theApplications)
    end if
    
    set jsonObj to current application's NSJSONSerialization's dataWithJSONObject:thePaths options:(current application's NSJSONWritingFragmentsAllowed) |error|:(missing value)
    set jsonString to current application's NSString's alloc()'s initWithData:jsonObj encoding:(current application's NSUTF8StringEncoding)
    return jsonString as text
  on error err
    return "[]"
  end try`)
  return JSON.parse(jsonString) as string[];
}